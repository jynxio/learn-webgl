const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute float a_PointSize;

    void main () {
        gl_Position = a_Position;   // 设置坐标
        gl_PointSize = a_PointSize; // 设置尺寸
    }
`;
    const FSHADER_SOURCE = `
    void main () {
        gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 ); // 设置颜色
    }
`;

function main () {

    /* 获取canvas元素 */
    const canvas = document.getElementById( "webgl" );

    /* 获取WebGL绘图上下文 */
    const gl = canvas.getContext( "webgl" );

    /* 初始化着色器 */
    initShaders( gl, VSHADER_SOURCE, FSHADER_SOURCE );

    /* 获取a_Position变量的存储地址 */
    const a_position = gl.getAttribLocation( gl.program, "a_Position" );
    const a_point_size = gl.getAttribLocation( gl.program, "a_PointSize" );

    /* 将顶点位置数据赋值给a_Position变量 */
    gl.vertexAttrib3f( a_position, 0.0, 0.0, 0.0 );
    gl.vertexAttrib1f( a_point_size, 5.0 );

    /* 设置背景色 */
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );

    /* 绘制一个点 */
    gl.drawArrays( gl.POINTS, 0, 1 );

}
