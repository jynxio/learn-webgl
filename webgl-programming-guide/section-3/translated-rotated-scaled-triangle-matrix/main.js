const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    uniform mat4 u_xformMatrix;

    void main () {
        gl_Position = u_xformMatrix * a_Position;
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

    /* 向顶点着色器传递偏移量 */
    const translation_x = 0.5;
    const translation_y = 0.5;
    const translation_z = 0;
    const xform_matrix = new Float32Array( [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        translation_x, translation_y, translation_z, 1,
    ] );
    const u_xform_matrix = gl.getUniformLocation( gl.program, "u_xformMatrix" );

    gl.uniformMatrix4fv( u_xform_matrix, false, xform_matrix );

    /* 创建缓冲区对象 */
    const vertex_buffer = gl.createBuffer();

    /* 绑定缓冲区对象（将缓冲区对象绑定至顶点着色器的ARRAY_BUFFER中去，这会表示缓冲区对象中存储的是顶点的位置数据） */
    gl.bindBuffer( gl.ARRAY_BUFFER, vertex_buffer );

    /* 向缓冲区对象写入数据（向绑定在ARRAY_BUFFER中的缓冲区对象写入数据） */
    const vertex_count = 4;
    const vertices = new Float32Array( [
        - 0.5, 0.5, 0.0,
        - 0.5, - 0.5, 0,
        0.5, 0.5, 0,
        0.5, - 0.5, 0
    ] );

    gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );

    /* 获取a_Position变量的存储地址 */
    const a_position = gl.getAttribLocation( gl.program, "a_Position" );

    /* 将缓冲区对象派送给a_Position变量（将绑定在ARRAY_BUFFER中的缓冲区对象的内存地址分配给a_Position变量） */
    gl.vertexAttribPointer( a_position, 3, gl.FLOAT, false, 0, 0 );

    /* 批准将缓冲区对象派送给a_Position变量 */
    gl.enableVertexAttribArray( a_position );

    /* 设置背景色 */
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );

    /* 绘制一个点 */
    gl.drawArrays( gl.TRIANGLE_FAN, 0, vertex_count );

}
