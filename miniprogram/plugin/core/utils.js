import {
	TextDecoder
} from "dhtml-weixin"
import * as THREE from "../three/Three"
const textDecoder = new TextDecoder()

function decode(raw, encoding) {
	return textDecoder.decode(raw)
}
class StreamReader {
	constructor(raw) {
		this._dataView = new DataView(raw)
		this._byteOffset = 0
	}
	// 80,889,010,294
	//-66,448,566
	read(type) {
		var value
		switch (type) {
			case StreamReader.Type.Int8:
				value = this._dataView.getInt8(this._byteOffset, true)
				this._byteOffset += 1;
				break
			case StreamReader.Type.UInt8:
				value = this._dataView.getUint8(this._byteOffset, true)
				this._byteOffset += 1;
				break
			case StreamReader.Type.Int16:
				value = this._dataView.getInt16(this._byteOffset, true)
				this._byteOffset += 2;
				break
			case StreamReader.Type.UInt16:
				value = this._dataView.getUint16(this._byteOffset, true)
				this._byteOffset += 2;
				break
			case StreamReader.Type.Int32:
				value = this._dataView.getInt32(this._byteOffset, true)
				this._byteOffset += 4;
				break
			case StreamReader.Type.UInt32:
				value = this._dataView.getUint32(this._byteOffset, true)
				this._byteOffset += 4;
				break
			case StreamReader.Type.Float32:
				value = this._dataView.getFloat32(this._byteOffset, true)
				this._byteOffset += 4;
				break
			default:
				console.error(type)
				throw new Error()
		}
		return value
	}
}
StreamReader.Type = {
	Int8: 0,
	UInt8: 1,
	Int16: 2,
	UInt16: 3,
	Int32: 4,
	UInt32: 5,
	Float32: 6
}
/*
function array2value(xrFrameSystem, type, array) {
	console.error("??????????",type, array)
	var value
	switch (type) {
		case xrFrameSystem.EUniformType.MAT2:
			value = new THREE.Matrix2();
			break
		case xrFrameSystem.EUniformType.MAT3:
			value = new THREE.Matrix3();
			break
		case xrFrameSystem.EUniformType.MAT4:
			value = new THREE.Matrix4();
			break
		case xrFrameSystem.EUniformType.SAMPLER:
			return value.three_texture
		default:
      return array
	}
	return value.fromArray(array)
}*/
module.exports = {
	decode,
	StreamReader,
//	array2value
}
