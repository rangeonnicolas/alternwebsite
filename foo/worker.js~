;(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw new Error('sigma is not declared');

  // Initialize package:
  sigma.utils.pkg('sigma.layouts');

  /**
   * Sigma ForceLink Webworker
   * ==============================
   *
   * Author: Guillaume Plique (Yomguithereal)
   * Algorithm author: Mathieu Jacomy @ Sciences Po Medialab & WebAtlas
   * Extensions author: Sébastien Heymann @ Linkurious
   * Version: 1.0.0
   */

  var _root = this,
      inWebWorker = !('document' in _root);

  /**
   * Worker Function Wrapper
   * ------------------------
   *
   * The worker has to be wrapped into a single stringified function
   * to be passed afterwards as a BLOB object to the supervisor.
   */
  var Worker = function(undefined) {
    'use strict';

    /**
     * Worker settings and properties
     */
    var W = {

      // Properties
      ppn: 10,
      ppe: 3,
      ppr: 9,






      maxForce: 20,//orig:10





      iterations: 0,
      converged: false,

      // Possible to change through config
      settings: {
        // force atlas 2:
        linLogMode: false,
        outboundAttractionDistribution: false,
        adjustSizes: false,
        edgeWeightInfluence: 0,
        scalingRatio: 1,
        strongGravityMode: false,
        gravity: 1,
        slowDown: 1,
        barnesHutOptimize: false,
        barnesHutTheta: 0.5,
        startingIterations: 1,
        iterationsPerRender: 1,
        // stopping condition:
        maxIterations: 1000,
        avgDistanceThreshold: 0.01,
        autoStop: false,
        // node siblings:
        alignNodeSiblings: false,
        nodeSiblingsScale: 1,
        nodeSiblingsAngleMin: 0
      }
    };

    var NodeMatrix,
        EdgeMatrix,
        RegionMatrix;

    /**
     * Helpers
     */
    function extend() {
      var i,
          k,
          res = {},
          l = arguments.length;

      for (i = l - 1; i >= 0; i--)
        for (k in arguments[i])
          res[k] = arguments[i][k];
      return res;
    }

    function __emptyObject(obj) {
      var k;

      for (k in obj)
        if (!('hasOwnProperty' in obj) || obj.hasOwnProperty(k))
          delete obj[k];

      return obj;
    }

    /**
     * Return the euclidian distance between two points of a plane
     * with an orthonormal basis.
     *
     * @param  {number} x1  The X coordinate of the first point.
     * @param  {number} y1  The Y coordinate of the first point.
     * @param  {number} x2  The X coordinate of the second point.
     * @param  {number} y2  The Y coordinate of the second point.
     * @return {number}     The euclidian distance.
     */
    function getDistance(x0, y0, x1, y1) {
      return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
    };

    /**
     * Return the coordinates of the intersection points of two circles.
     *
     * @param  {number} x0  The X coordinate of center location of the first
     *                      circle.
     * @param  {number} y0  The Y coordinate of center location of the first
     *                      circle.
     * @param  {number} r0  The radius of the first circle.
     * @param  {number} x1  The X coordinate of center location of the second
     *                      circle.
     * @param  {number} y1  The Y coordinate of center location of the second
     *                      circle.
     * @param  {number} r1  The radius of the second circle.
     * @return {xi,yi}      The coordinates of the intersection points.
     */
    function getCircleIntersection(x0, y0, r0, x1, y1, r1) {
      // http://stackoverflow.com/a/12219802
      var a, dx, dy, d, h, rx, ry, x2, y2;

      // dx and dy are the vertical and horizontal distances between the circle
      // centers:
      dx = x1 - x0;
      dy = y1 - y0;

      // Determine the straight-line distance between the centers:
      d = Math.sqrt((dy * dy) + (dx * dx));

      // Check for solvability:
      if (d > (r0 + r1)) {
          // No solution. circles do not intersect.
          return false;
      }
      if (d < Math.abs(r0 - r1)) {
          // No solution. one circle is contained in the other.
          return false;
      }

      //'point 2' is the point where the line through the circle intersection
      // points crosses the line between the circle centers.

      // Determine the distance from point 0 to point 2:
      a = ((r0 * r0) - (r1 * r1) + (d * d)) / (2.0 * d);

      // Determine the coordinates of point 2:
      x2 = x0 + (dx * a / d);
      y2 = y0 + (dy * a / d);

      // Determine the distance from point 2 to either of the intersection
      // points:
      h = Math.sqrt((r0 * r0) - (a * a));

      // Determine the offsets of the intersection points from point 2:
      rx = -dy * (h / d);
      ry = dx * (h / d);

      // Determine the absolute intersection points:
      var xi = x2 + rx;
      var xi_prime = x2 - rx;
      var yi = y2 + ry;
      var yi_prime = y2 - ry;

      return {xi: xi, xi_prime: xi_prime, yi: yi, yi_prime: yi_prime};
    };

    /**
     * Find the intersection between two lines, two segments, or one line and one segment.
     * http://jsfiddle.net/justin_c_rounds/Gd2S2/
     *
     * @param  {number} line1x1  The X coordinate of the start point of the first line.
     * @param  {number} line1y1  The Y coordinate of the start point of the first line.
     * @param  {number} line1x2  The X coordinate of the end point of the first line.
     * @param  {number} line1y2  The Y coordinate of the end point of the first line.v
     * @param  {number} line2x1  The X coordinate of the start point of the second line.
     * @param  {number} line2y1  The Y coordinate of the start point of the second line.
     * @param  {number} line2x2  The X coordinate of the end point of the second line.
     * @param  {number} line2y2  The Y coordinate of the end point of the second line.
     * @return {object}           The coordinates of the intersection point.
     */
    function getLinesIntersection(line1x1, line1y1, line1x2, line1y2, line2x1, line2y1, line2x2, line2y2) {
      // if the lines intersect, the result contains the x and y of the intersection
      // (treating the lines as infinite) and booleans for whether line segment 1 or
      // line segment 2 contain the point
      var
        denominator,
        a,
        b,
        numerator1,
        numerator2,
        result = {
          x: null,
          y: null,
          onLine1: false,
          onLine2: false
      };

      denominator =
        ((line2y2 - line2y1) * (line1x2 - line1x1)) -
        ((line2x2 - line2x1) * (line1y2 - line1y1));

      if (denominator == 0) {
          return result;
      }

      a = line1y1 - line2y1;
      b = line1x1 - line2x1;

      numerator1 = ((line2x2 - line2x1) * a) - ((line2y2 - line2y1) * b);
      numerator2 = ((line1x2 - line1x1) * a) - ((line1y2 - line1y1) * b);

      a = numerator1 / denominator;
      b = numerator2 / denominator;

      // if we cast these lines infinitely in both directions, they intersect here:
      result.x = line1x1 + (a * (line1x2 - line1x1));
      result.y = line1y1 + (a * (line1y2 - line1y1));
      /*
      // it is worth noting that this should be the same as:
        x = line2x1 + (b * (line2x2 - line2x1));
        y = line2x1 + (b * (line2y2 - line2y1));
      */
      // if line1 is a segment and line2 is infinite, they intersect if:
      if (a > 0 && a < 1) {
          result.onLine1 = true;
      }
      // if line2 is a segment and line1 is infinite, they intersect if:
      if (b > 0 && b < 1) {
          result.onLine2 = true;
      }
      // if line1 and line2 are segments, they intersect if both of the above are true
      return result;
    };

    /**
     * Scale a value from the range [baseMin, baseMax] to the range
     * [limitMin, limitMax].
     *
     * @param  {number} value    The value to rescale.
     * @param  {number} baseMin  The min value of the range of origin.
     * @param  {number} baseMax  The max value of the range of origin.
     * @param  {number} limitMin The min value of the range of destination.
     * @param  {number} limitMax The max value of the range of destination.
     * @return {number}          The scaled value.
     */
    function scaleRange(value, baseMin, baseMax, limitMin, limitMax) {
      return ((limitMax - limitMin) * (value - baseMin) / (baseMax - baseMin)) + limitMin;
    };

    /**
     * Get the angle of the vector (in radian).
     *
     * @param  {object} v  The 2d vector with x,y coordinates.
     * @return {number}    The angle of the vector  (in radian).
     */
    function getVectorAngle(v) {
      return Math.acos( v.x / Math.sqrt(v.x * v.x + v.y * v.y) );
    };

    /**
     * Get the normal vector of the line segment, i.e. the vector
     * orthogonal to the line.
     * http://stackoverflow.com/a/1243614/
     *
     * @param  {number} aX The x coorinates of the start point.
     * @param  {number} aY The y coorinates of the start point.
     * @param  {number} bX The x coorinates of the end point.
     * @param  {number} bY The y coorinates of the end point.
     * @return {object}    The 2d vector with (xi,yi), (xi_prime,yi_prime) coordinates.
     */
    function getNormalVector(aX, aY, bX, bY) {
      return {
        xi:       -(bY - aY),
        yi:         bX - aX,
        xi_prime:   bY - aY,
        yi_prime: -(bX - aX)
      };
    };

    /**
     * Get the normalized vector.
     *
     * @param  {object} v      The 2d vector with (xi,yi), (xi_prime,yi_prime) coordinates.
     * @param  {number} length The vector length.
     * @return {object}        The normalized vector
     */
    function getNormalizedVector(v, length) {
      return {
        x: (v.xi_prime - v.xi) / length,
        y: (v.yi_prime - v.yi) / length,
      };
    };

    /**
     * Get the a point the line segment [A,B] at a specified distance percentage
     * from the start point.
     *
     * @param  {number} aX The x coorinates of the start point.
     * @param  {number} aY The y coorinates of the start point.
     * @param  {number} bX The x coorinates of the end point.
     * @param  {number} bY The y coorinates of the end point.
     * @param  {number} t  The distance percentage from the start point.
     * @return {object}    The (x,y) coordinates of the point.
     */
    function getPointOnLineSegment(aX, aY, bX, bY, t) {
      return {
        x: aX + (bX - aX) * t,
        y: aY + (bY - aY) * t
      };
    }



    /**
     * Matrices properties accessors
     */
    var nodeProperties = {
      x: 0,
      y: 1,
      dx: 2,
      dy: 3,
      old_dx: 4,
      old_dy: 5,
      mass: 6,
      convergence: 7,
      size: 8,
      fixed: 9
    };

    var edgeProperties = {
      source: 0,
      target: 1,
      weight: 2
    };

    var regionProperties = {
      node: 0,
      centerX: 1,
      centerY: 2,
      size: 3,
      nextSibling: 4,
      firstChild: 5,
      mass: 6,
      massCenterX: 7,
      massCenterY: 8
    };

    function np(i, p) {

      // DEBUG: safeguards
      if ((i % W.ppn) !== 0)
        throw new Error('Invalid argument in np: "i" is not correct (' + i + ').');
      if (i !== parseInt(i))
        throw new TypeError('Invalid argument in np: "i" is not an integer.');

      if (p in nodeProperties)
        return i + nodeProperties[p];
      else
        throw new Error('ForceLink.Worker - ' +
              'Inexistant node property given (' + p + ').');
    }

    function ep(i, p) {

      // DEBUG: safeguards
      if ((i % W.ppe) !== 0)
        throw new Error('Invalid argument in ep: "i" is not correct (' + i + ').');
      if (i !== parseInt(i))
        throw new TypeError('Invalid argument in ep: "i" is not an integer.');

      if (p in edgeProperties)
        return i + edgeProperties[p];
      else
        throw new Error('ForceLink.Worker - ' +
              'Inexistant edge property given (' + p + ').');
    }

    function rp(i, p) {

      // DEBUG: safeguards
      if ((i % W.ppr) !== 0)
        throw new Error('Invalid argument in rp: "i" is not correct (' + i + ').');
      if (i !== parseInt(i))
        throw new TypeError('Invalid argument in rp: "i" is not an integer.');

      if (p in regionProperties)
        return i + regionProperties[p];
      else
        throw new Error('ForceLink.Worker - ' +
              'Inexistant region property given (' + p + ').');
    }

    // DEBUG
    function nan(v) {
      if (isNaN(v))
        throw new TypeError('NaN alert!');
    }


    /**
     * Algorithm initialization
     */

    function init(nodes, edges, config) {
      config = config || {};
      var i, l;

      // Matrices
      NodeMatrix = nodes;
      EdgeMatrix = edges;

      // Length
      W.nodesLength = NodeMatrix.length;
      W.edgesLength = EdgeMatrix.length;

      // Merging configuration
      configure(config);
    }

    function configure(o) {
      W.settings = extend(o, W.settings);
    }

    /**
     * Algorithm pass
     */










    // MATH: get distances stuff and power 2 issues
    function pass() {
      var a, i, j, l, r, n, n1, n2, e, w, g, k, m;

      var outboundAttCompensation,
          coefficient,
          xDist,
          yDist,
          oldxDist,
          oldyDist,
          ewc,
          mass,
          distance,
          size,
          factor;

      // 1) Initializing layout data
      //-----------------------------

      // Resetting positions & computing max values
      for (n = 0; n < W.nodesLength; n += W.ppn) {
        NodeMatrix[np(n, 'old_dx')] = NodeMatrix[np(n, 'dx')];
        NodeMatrix[np(n, 'old_dy')] = NodeMatrix[np(n, 'dy')];
        NodeMatrix[np(n, 'dx')] = 0;
        NodeMatrix[np(n, 'dy')] = 0;
      }


      // 2) Repulsion
      //--------------
      // NOTES: adjustSize = antiCollision & scalingRatio = coefficient

        coefficient = W.settings.scalingRatio;

        // Square iteration
        for (n1 = 0; n1 < W.nodesLength; n1 += W.ppn) {
          for (n2 = 0; n2 < n1; n2 += W.ppn) {

            // Common to both methods
            xDist = NodeMatrix[np(n1, 'x')] - NodeMatrix[np(n2, 'x')];
            yDist = NodeMatrix[np(n1, 'y')] - NodeMatrix[np(n2, 'y')];


              //-- Anticollision Linear Repulsion
              distance = Math.sqrt(xDist * xDist + yDist * yDist) -30 -1*
                ( NodeMatrix[np(n1, 'size')] 
                 +NodeMatrix[np(n2, 'size')]);

              if (distance > 0) {
              }
              else if (distance < 0) {
                factor = 1;

                // Updating nodes' dx and dy
                NodeMatrix[np(n1, 'dx')] += xDist * factor;
                NodeMatrix[np(n1, 'dy')] += yDist * factor;

                NodeMatrix[np(n2, 'dx')] -= xDist * factor;
                NodeMatrix[np(n2, 'dy')] -= yDist * factor;
              }
            
          }
        }
      






      // 5) Apply Forces
      //-----------------
      var force,
          swinging,
          traction,
          nodespeed,
          alldistance = 0;



        for (n = 0; n < W.nodesLength; n += W.ppn) {
          if (!NodeMatrix[np(n, 'fixed')]) {
            force = Math.sqrt(
              NodeMatrix[np(n, 'dx')] * NodeMatrix[np(n, 'dx')] +
              NodeMatrix[np(n, 'dy')] * NodeMatrix[np(n, 'dy')]
            );

            if (force > W.maxForce) {
              NodeMatrix[np(n, 'dx')] =
                NodeMatrix[np(n, 'dx')] * W.maxForce / force;
              NodeMatrix[np(n, 'dy')] =
                NodeMatrix[np(n, 'dy')] * W.maxForce / force;
            }


            oldxDist = NodeMatrix[np(n, 'x')];
            oldyDist = NodeMatrix[np(n, 'y')];

            // Updating node's positon
            NodeMatrix[np(n, 'x')] =
              NodeMatrix[np(n, 'x')] + NodeMatrix[np(n, 'dx')] 
            NodeMatrix[np(n, 'y')] =
              NodeMatrix[np(n, 'y')] + NodeMatrix[np(n, 'dy')] 

            xDist = NodeMatrix[np(n, 'x')];
            yDist = NodeMatrix[np(n, 'y')];
            distance = Math.sqrt(
              (xDist - oldxDist) * (xDist - oldxDist) +
              (yDist - oldyDist) * (yDist - oldyDist)
            );
            alldistance += distance;
          }
        }
      



      // Counting one more iteration
      W.iterations++;



      // Auto stop.
      // The greater the ratio nb nodes / nb edges,
      // the greater the number of iterations needed to converge.
      if (W.settings.autoStop) {
        W.converged = (
          W.iterations > W.settings.maxIterations ||
          alldistance / W.nodesLength < W.settings.avgDistanceThreshold
        );

      }
    }

    /**
     * Message reception & sending
     */

    // Sending data back to the supervisor
    var sendNewCoords;

    if (typeof window !== 'undefined' && window.document) {

      // From same document as sigma
      sendNewCoords = function() {
        if (!W.autoStop || W.converged) {
          var e;

          if (document.createEvent) {
            e = document.createEvent('Event');
            e.initEvent('newCoords', true, false);
          }
          else {
            e = document.createEventObject();
            e.eventType = 'newCoords';
          }

          e.eventName = 'newCoords';
          e.data = {
            nodes: NodeMatrix.buffer,
            converged: W.converged
          };
          requestAnimationFrame(function() {
            document.dispatchEvent(e);
          });
        }
      };
    }
    else {

      // From a WebWorker
      sendNewCoords = function() {
        if (!W.autoStop || W.converged) {
          self.postMessage(
            {
              nodes: NodeMatrix.buffer,
              converged: W.converged
            },
            [NodeMatrix.buffer]
          );
        }
      };
    }

    // Algorithm run
    function run(n) {
      for (var i = 0; i < n; i++)
        pass();
      sendNewCoords();
    }

    // On supervisor message
    var listener = function(e) {
      switch (e.data.action) {
        case 'start':
          init(
            new Float32Array(e.data.nodes),
            new Float32Array(e.data.edges),
            e.data.config
          );

          // First iteration(s)
          run(W.settings.startingIterations);
          break;

        case 'loop':
          NodeMatrix = new Float32Array(e.data.nodes);
          run(W.settings.iterationsPerRender);
          break;

        case 'config':

          // Merging new settings
          configure(e.data.config);
          break;

        case 'kill':

          // Deleting context for garbage collection
          __emptyObject(W);
          NodeMatrix = null;
          EdgeMatrix = null;
          RegionMatrix = null;
          self.removeEventListener('message', listener);
          break;

        default:
      }
    };

    // Adding event listener
    self.addEventListener('message', listener);
  };


  /**
   * Exporting
   * ----------
   *
   * Crush the worker function and make it accessible by sigma's instances so
   * the supervisor can call it.
   */
  function crush(fnString) {
    var pattern,
        i,
        l;

    var np = [
      'x',
      'y',
      'dx',
      'dy',
      'old_dx',
      'old_dy',
      'mass',
      'convergence',
      'size',
      'fixed'
    ];

    var ep = [
      'source',
      'target',
      'weight'
    ];

    var rp = [
      'node',
      'centerX',
      'centerY',
      'size',
      'nextSibling',
      'firstChild',
      'mass',
      'massCenterX',
      'massCenterY'
    ];

    // rp
    // NOTE: Must go first
    for (i = 0, l = rp.length; i < l; i++) {
      pattern = new RegExp('rp\\(([^,]*), \'' + rp[i] + '\'\\)', 'g');
      fnString = fnString.replace(
        pattern,
        (i === 0) ? '$1' : '$1 + ' + i
      );
    }

    // np
    for (i = 0, l = np.length; i < l; i++) {
      pattern = new RegExp('np\\(([^,]*), \'' + np[i] + '\'\\)', 'g');
      fnString = fnString.replace(
        pattern,
        (i === 0) ? '$1' : '$1 + ' + i
      );
    }

    // ep
    for (i = 0, l = ep.length; i < l; i++) {
      pattern = new RegExp('ep\\(([^,]*), \'' + ep[i] + '\'\\)', 'g');
      fnString = fnString.replace(
        pattern,
        (i === 0) ? '$1' : '$1 + ' + i
      );
    }

    return fnString;
  }

  // Exporting
  function getWorkerFn() {
    var fnString = crush ? crush(Worker.toString()) : Worker.toString();
    return ';(' + fnString + ').call(this);';
  }

  if (inWebWorker) {
    // We are in a webworker, so we launch the Worker function
    eval(getWorkerFn());
  }
  else {
    // We are requesting the worker from sigma, we retrieve it therefore
    if (typeof sigma === 'undefined')
      throw new Error('sigma is not declared');

    sigma.layouts.getForceLinkWorker = getWorkerFn;
  }
}).call(this);
