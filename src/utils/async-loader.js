/**
 * 懒加载
 * @param {String} chunkPath 相对路径
 */

const AsyncLoader = chunkPath => () => import(/* webpackChunkName: "chunk-[request]" */ `@/${chunkPath}`);

export default AsyncLoader;
