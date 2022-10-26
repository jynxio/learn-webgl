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

    /* 创建、绑定、写入缓冲区对象 */
    const vertex_buffer = gl.createBuffer();
    const vertex_count = 3;
    const vertices = new Float32Array( [
        - 0.26, - 0.15, 0,
        0.26, - 0.15, 0,
        0, 0.3, 0,
    ] );

    gl.bindBuffer( gl.ARRAY_BUFFER, vertex_buffer );
    gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );

    /* 将缓冲区对象的内容派送给a_Position */
    const a_position_location = gl.getAttribLocation( gl.program, "a_Position" );

    gl.vertexAttribPointer( a_position_location, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( a_position_location );

    /* 设置背景色 */
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    /*  */
    const speed = 120;                       // 30度/秒
    const matrix4 = new Matrix4();
    const initial_time = performance.now();
    const u_xform_matrix_location = gl.getUniformLocation( gl.program, "u_xformMatrix" );

    requestAnimationFrame( function loop () {

        requestAnimationFrame( loop );

        const elapsed_time = performance.now() - initial_time;
        const radian = elapsed_time / 1000 * speed;

        matrix4.setRotate( radian, 0, 0, 1 );
        matrix4.translate( 0.5, 0, 0 );
        gl.uniformMatrix4fv( u_xform_matrix_location, false, matrix4.elements );
        gl.clear( gl.COLOR_BUFFER_BIT );
        gl.drawArrays( gl.TRIANGLE_FAN, 0, vertex_count );

    } );

}
