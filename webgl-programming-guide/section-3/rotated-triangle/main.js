const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    uniform float u_SinB, u_CosB;

    void main () {
        gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
        gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
        gl_Position.z = a_Position.z;
        gl_Position.w = 1.0;
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
    const rotation_z = Math.PI / 4; // 正旋转
    const sin_rotation_z = Math.sin( rotation_z );
    const cos_rotation_z = Math.cos( rotation_z );

    const u_sinb = gl.getUniformLocation( gl.program, "u_SinB" );
    const u_cosb = gl.getUniformLocation( gl.program, "u_CosB" );

    gl.uniform1f( u_sinb, sin_rotation_z );
    gl.uniform1f( u_cosb, cos_rotation_z );

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
