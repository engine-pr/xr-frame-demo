/**
 * EnvDataLoader.ts
 * 
 * @Author  : hikaridai(hikaridai@tencent.com)
 * @Date    : 5/10/2022, 11:27:49 AM
 */
import EnvData from '../assets/EnvData';
import {fetch} from 'dhtml-weixin';
import {isCloudURL, isDataURI, isHTTPURL} from './downloader/url';
import {Kanata} from '../ext';
import AssetLoader from './AssetLoader';

import {decode, StreamReader} from '../core/utils';



const MAGIC = new Uint32Array([1920497783, 1986946349]);
const SH9_SCALE = [
  Math.sqrt(1 / (4 * Math.PI)),
  Math.sqrt(3 / (4 * Math.PI)),
  Math.sqrt(3 / (4 * Math.PI)),
  Math.sqrt(3 / (4 * Math.PI)),
  Math.sqrt(15 / (4 * Math.PI)),
  Math.sqrt(15 / (4 * Math.PI)),
  Math.sqrt(5 / (16 * Math.PI)),
  Math.sqrt(15 / (4 * Math.PI)),
  Math.sqrt(15 / (16 * Math.PI))
];

/**
 * 环境数据资源{@link EnvData}的加载器。
 * 
 * 拥有内置资源`xr-frame-team-workspace-day`、`xr-frame-team-workspace-night`以及`xr-frame-team-workspace-day2`。  
 * 加载的资源一般由[xr-frame-cli](https://github.com/wechat-miniprogram/xr-frame-cli)生成。  
 */
export default class EnvDataLoader extends AssetLoader {
  constructor(_scene,type){
    super(_scene,type)
  }
   get schema(){};

   async load(
    params,
    callbacks
  ) {
    const {options, src} = params;
    const tmp = src.split('/');
    tmp.pop();
    const prefix = tmp.join('/');

    let source;
    let binStart;
    let raw;
    
    try {
      raw = await (await fetch(params.src, 'binary')).arrayBuffer();

 
      if (raw.byteLength % 4 !== 0) {
        source = JSON.parse(decode(raw, 'utf-8'));
      } else {
        const stream = new StreamReader(raw);
        const magic1 = stream.read(StreamReader.Type.UInt32);
        const magic2 = stream.read(StreamReader.Type.UInt32);
        const isBin = magic1 === MAGIC[0] && magic2 === MAGIC[1];
        if (!isBin) {
          const json = decode(raw, 'utf-8')
          source = JSON.parse(json);
        } else {
          const jsonLen = stream.read(StreamReader.Type.UInt32);
          binStart = stream.read(StreamReader.Type.UInt32) + 16;
          source = JSON.parse(decode(new Uint8Array(raw, 16, jsonLen), 'utf-8'));
        }
      }
    } catch (error) {
      console.error(error)
      return callbacks.onError(error);
    }

    const {skybox, diffuse, specular} = source;
    const data = {};
    let skyMapUrl;

    if (skybox) {
      let promises;
      if (skybox.type === '2D') {
        if (binStart === undefined) {
          skyMapUrl = this._getUrl(skybox.map , prefix);
          promises = [this._loadImg(skyMapUrl)];
        } else {
          const s = source.skybox.map ;
          skyMapUrl = new Uint8Array(raw, binStart + s.offset, s.length);
          promises = [this._loadImg(skyMapUrl, s.type)];
        }
      } else {
        promises = (skybox.map).map(src => this._loadImg(this._getUrl(src, prefix)));
      }

      try {
        const imgs = await Promise.all(promises);

        if (params.canceled) {
          return;
        }

        data.skybox = {
          half: skybox.half,
          map: this.scene.createTexture({
            type: skybox.type === '2D' ? Kanata.ETextureType.D2 : Kanata.ETextureType.Cube,
            source: imgs,
            width: imgs[0].width,
            height: imgs[0].height,
            magFilter: Kanata.EFilterMode.LINEAR,
            minFilter: Kanata.EFilterMode.LINEAR,
            wrapU: Kanata.EWrapMode.CLAMP_TO_EDGE,
            wrapV: Kanata.EWrapMode.CLAMP_TO_EDGE,
            anisoLevel: 1
          })
        };
      } catch (error) {
        callbacks.onError(error);
        return;
      }
    }

    if (diffuse) {
      diffuse.coefficients.forEach((v, index) => {
        const s = SH9_SCALE[index];
        v[0] *= s;
        v[1] *= s;
        v[2] *= s;
      });

      data.diffuse = {
        coefficients: new Float32Array(diffuse.coefficients.flat())
      };
    }

    if (specular) {
      try {
        data.specular = {
          type: specular.type,
          rgbd: specular.rgbd,
          mipmaps: specular.mipmaps,
          map: data.skybox.map
        };
        data.specular.mipmapCount = (specular.mipmapCount) ? specular.mipmapCount: 8;

        let specularMapUrl;
        let specularMapType;
        if (binStart === undefined) {
          specularMapUrl = this._getUrl(specular.map , prefix);
        } else {
          const s = source.specular.map ;
          specularMapUrl = new Uint8Array(raw, binStart + s.offset, s.length);
          specularMapType = s.type;
        }
        if (skyMapUrl !== specularMapUrl) {
          const img = await this._loadImg(specularMapUrl, specularMapType);

          if (params.canceled) {
            return;
          }

          data.specular.map = this.scene.createTexture({
            type: Kanata.ETextureType.D2,
            source: [img],
            width: img.width,
            height: img.height,
            magFilter: Kanata.EFilterMode.LINEAR,
            minFilter: Kanata.EFilterMode.LINEAR,
            wrapU: Kanata.EWrapMode.CLAMP_TO_EDGE,
            wrapV: Kanata.EWrapMode.CLAMP_TO_EDGE,
            anisoLevel: 1
          }); 
        }
      } catch (error) {
        return callbacks.onError(error);
      }
    }
    const value = new EnvData(data);
    return callbacks.onLoaded(value);
  }

   _loadImg(src, type) {
    const img = this.scene.createImage();

    return new Promise((resolve, reject) => {
      img.onload = () => {
        resolve(img);
      }
  
      img.onerror = (error) => {
        reject(error);
      }
  
      img.type = type;
      img.src = src;
    })
  }

   _getUrl(src, prefix) {
    if (isHTTPURL(src) || isCloudURL(src) || isDataURI(src)) {
      return src;
    }

    return `${prefix}/${src}`;
  }

   getBuiltin() {
    return [
      {
        assetId: 'xr-frame-team-workspace-day',
        src: 'https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/env-data/xr-frame-team-workspace-day.bin',
        options: {}
      },
      {
        assetId: 'xr-frame-team-workspace-night',
        src: 'https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/env-data/xr-frame-team-workspace-night.bin',
        options: {}
      },
      {
        assetId: 'xr-frame-team-workspace-day2',
        src: 'https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/env-data/xr-frame-team-workspace-day2.bin',
        options: {}
      },
      {
        assetId: 'gz-haixinsha',
        src: 'https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/env-data/gz-haixinsha.bin',
        options: {}
      },
      {
        assetId: 'luguhu-side',
        src: 'https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/env-data/luguhu-side.bin',
        options: {}
      },
      {
        assetId: 'luguhu-caohai',
        src: 'https://mmbizwxaminiprogram-1258344707.cos.ap-guangzhou.myqcloud.com/xr-frame/env-data/luguhu-caohai.bin',
        options: {}
      }
    ];
  }

   release(params, value) {
    value.destroy();
  }
}

