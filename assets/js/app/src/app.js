/**
 * App initialization.
 */
app = {
    animation: null
};

/**
 * On document click.
 */
$(document).click(function(event) {

    if (app.animation !== null) {
        app.animation.stopAnimation();
        delete app.animation;
        app.animation = null;
    }

    app.animation = new app.ball();
    app.animation.setInitialPosition(event.pageX, event.pageY);
    app.animation.startAnimation();

});

/**
 * On window resize.
 */
$(window).resize(function() {

    if (app.animation !== null) {
        app.animation.resizeCanvas();
    }

});

/**
 * Ball module.
 */
app.ball = function() {

    /**
     * Bouncig ball animation.
     *
     * @type {jquery} _canvas jquery element canvas
     * @type {object} _context canvas context
     * @type {number} _gravity gravity value
     * @type {number} _velocityReductionFactor velocity reduction factor
     * @type {number} _ballRadius ball radius
     * @type {string} _ballColor ball color
     * @type {number} _xPosition x position
     * @type {number} _yPosition y position
     * @type {number} _xVelocity x velocity
     * @type {number} _yVelocity y velocity
     * @type {number} _endBounce bounces to stop ball
     * @type {number} _animation set interval animation reference
     */
    var _canvas = $("canvas");
    var _context = _canvas[0].getContext('2d');

    var _gravity = 0.1;
    var _velocityReductionFactor = 0.8;
    var _ballRadius = 15;
    var _ballColor = "#9a0505";

    var _xPosition = 1;
    var _yPosition = 1;

    var _xVelocity = 8;
    var _yVelocity = 0;

    var _endBounce = 0;

    var _animation = null;

    /**
     * Start ball animation.
     */
    _startAnimation = function() {

        _resizeCanvas();
        _setInitialVelocity();

        _animation = setInterval(_updatePosition, 1000 / 60);

    };

    /**
     * Stop ball animation.
     */
    _stopAnimation = function() {

        clearInterval(_animation);

    };

    /**
     * Resize canvas to window width and height.
     */
    _resizeCanvas = function() {

        _canvas.attr("width", $(window).innerWidth());
        _canvas.attr("height", $(window).innerHeight());

    };

    /**
     * Set ball initial velocity.
     */
    _setInitialVelocity = function() {

        _xVelocity = _randomIntFromInterval(1, 30);

        if (_xVelocity % 2 === 0) {
            _xVelocity = -_xVelocity;
        }

    };

    /**
     * Set ball initial position.
     * 
     * @param {number} x click x position
     * @param {number} y click y position
     */
    _setInitialPosition = function(x, y) {

        _xPosition = x;
        _yPosition = y;

    };

    /**
     * Update ball position.
     */
    _updatePosition = function() {

        /* stop update */
        if (_endBounce > 60) {
            _stopAnimation();
            return false;
        }

        /* add gravity */
        _yVelocity += _gravity;

        /* update position */
        _xPosition += _xVelocity;
        _yPosition += _yVelocity;

        /* count bounces when hit bottom wall  */
        if (Math.floor(_yPosition) === (_canvas.height() - _ballRadius)) {
            _endBounce++;
        }

        /* hit bottom wall */
        if (_yPosition > _canvas.height() - _ballRadius) {
            _yPosition = _canvas.height() - _ballRadius;
            _yVelocity *= -_velocityReductionFactor;
            _reduceVelocity();
        }

        /* hit left wall */
        if (_xPosition < _ballRadius) {
            _xPosition = _ballRadius;
            _xVelocity = -_xVelocity;
            _reduceVelocity();
        }

        /* hit right wall */
        if (_xPosition > _canvas.width() - _ballRadius) {
            _xPosition = _canvas.width() - _ballRadius;
            _reduceVelocity();
            _xVelocity = -_xVelocity;
        }

        _drawBall();
    };

    /**
     * Draw ball to canvas.
     */
    _drawBall = function() {

        _context.clearRect(0, 0, $("canvas").width(), $("canvas").height());
        _context.fillStyle = _ballColor;
        _context.beginPath();
        _context.arc(_xPosition, _yPosition, _ballRadius, 0, 2 * Math.PI, true);
        _context.closePath();
        _context.fill();

    };

    /**
     * Reduce ball velocity.
     */
    _reduceVelocity = function() {

        if (_xVelocity > 0) {
            _xVelocity = parseInt(_xVelocity / 1.5);
        }

    };

    /**
     * Get random number between minimal and maximum value.
     * 
     * @param {number} min minimal value
     * @param {number} max maximum value
     */
    _randomIntFromInterval = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    /**
     * Public methods.
     */
    return {
        startAnimation: _startAnimation,
        stopAnimation: _stopAnimation,
        resizeCanvas: _resizeCanvas,
        setInitialPosition: _setInitialPosition
    };
};