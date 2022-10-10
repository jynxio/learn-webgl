function main () {

    /* 获取canvas元素 */
    const canvas = document.getElementById( "webgl" );

    /* 获取WebGL绘图上下文 */
    const gl = canvas.getContext( "webgl" );

    /* 指定用于清空canvas的颜色 */
    gl.clearColor( 1.0, 0.0, 0.0, 1.0 );

    /* 清空canvas */
    gl.clear( gl.COLOR_BUFFER_BIT );

}
