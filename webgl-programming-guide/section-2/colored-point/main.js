const VSHADER_SOURCE = `
    attribute vec4 a_Position;

    void main () {
        gl_Position = a_Position;   // 设置坐标
        gl_PointSize = 10.0;        // 设置尺寸
    }
`;
    const FSHADER_SOURCE = `
    precision mediump float;
    uniform vec4 u_FragColor; // uniform变量

    void main () {
        gl_FragColor = u_FragColor; // 设置颜色
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

    /* 获取u_FragColor变量的存储地址 */
    const u_frag_color = gl.getUniformLocation( gl.program, "u_FragColor" );

    /* 设置背景色 */
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    gl.clear( gl.COLOR_BUFFER_BIT );

    /* 注册鼠标点击事件 */
    const g_points = []; // 记录鼠标点击位置的数组
    const g_colors = []; // 记录点的颜色的数组

    canvas.addEventListener( "mousedown", event => {

        const rect = event.target.getBoundingClientRect();
        let x = event.clientX;
        let y = event.clientY;

        x = ( x - rect.left ) / canvas.width * 2 - 1;
        y = - ( ( y - rect.top ) / canvas.height * 2 - 1 );

        /*  */
        g_points.push( x, y );

        /*  */
        if ( x >= 0 && y >= 0 ) g_colors.push( 1, 0, 0, 1 ); // 第一象限：红色
        if ( x <= 0 && y >= 0 ) g_colors.push( 0, 1, 0, 1 ); // 第二象限：绿色
        if ( x <= 0 && y <= 0 ) g_colors.push( 0, 0, 1, 1 ); // 第三象限：蓝色
        if ( x >= 0 && y <= 0 ) g_colors.push( 1, 1, 1, 1 ); // 第四象限：白色

        /* 设置背景色（默认情况下，WebGL会丢弃上一次的颜色缓冲区的结果） */
        gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
        gl.clear( gl.COLOR_BUFFER_BIT );

        const count = g_points.length / 2;

        for ( let i = 0; i < count; i++ ) {

            const x = g_points[ i * 2 ];
            const y = g_points[ i * 2 + 1 ];

            const r = g_colors[ i * 4 ];
            const g = g_colors[ i * 4 + 1 ];
            const b = g_colors[ i * 4 + 2 ];
            const a = g_colors[ i * 4 + 3 ];

            gl.vertexAttrib4f( a_position, x, y, 0, 1 ); // 赋值给a_Position变量
            gl.uniform4f( u_frag_color, r, g, b, a );    // 赋值给u_FragColor变量
            gl.drawArrays( gl.POINTS, 0, 1 );            // 绘制点

        }

    } );

}
