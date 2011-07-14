/* Generate classic perlin noise for coordinates 
 * see: http://staffwww.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf
 *      http://www.noisemachine.com/talk1/
 *      http://mrl.nyu.edu/~perlin/noise/
 */

var gradients = [
    [ 0, 1],
    [ 1, 0],
    [ 0,-1],
    [-1, 0],
    [ 0.707106781, 0.707106781],
    [-0.707106781, 0.707106781],
    [-0.707106781,-0.707106781],
    [-0.707106781,-0.707106781]
];

var permutations = [ 151,160,137,91,90,15,
    131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
    190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
    88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
    77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
    102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
    135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
    5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
    223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
    129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
    251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
    49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
    138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
];

permutations = permutations.concat(permutations);

function dot(g, x, y) 
{
    return g[0]*x + g[1]*y; 
}

function mix(a, b, t)
{
    return (1-t)*a + t*b;
}

function fade(t)
{
    return t*t*t*(t*(t*6-15)+10);
}

function perlin(x, y)
{
    x *= 16;
    y *= 16;
    var X = Math.floor(x);
    var Y = Math.floor(y);

    x = x - X;
    y = y - Y;

    X = X & 255;
    Y = Y & 255;

    var gi00 = permutations[X+permutations[Y]] % 8;
    var gi01 = permutations[X+permutations[Y+1]] % 8;
    var gi10 = permutations[X+1+permutations[Y]] % 8;
    var gi11 = permutations[X+1+permutations[Y+1]] % 8;

    var n00 = dot(gradients[gi00], x, y);
    var n01 = dot(gradients[gi01], x, y-1);
    var n10 = dot(gradients[gi10], x-1, y);
    var n11 = dot(gradients[gi11], x-1, y-1);

    var u = fade(x);
    var v = fade(y);

    var nx00 = mix(n00, n10, u);
    var nx01 = mix(n01, n11, u);

    var nxy0 = mix(nx00, nx01, v);

    return nxy0;
}

