    function launch_tests(data,expected_results,assert,func="equal",done=null){
        if(func == "equal")
            for(var i in data)
                assert.equal(data[i],expected_results[i])
        else if (func == "deepEqual")
            for(var i in data)
                assert.deepEqual(data[i],expected_results[i])

        if(done !== null)
            done()
    }

        function format_data(f,data){
            res = [];
            for(var i in data){
                res.push(f(data[i],i));
            }
            return res
        }

function check_html(elems, original_jquery_string = "", each_tag_is_unique =
    true, html_str_to_compare="body") {
    var elem, tag, str, returned, result, child;
    for (var e in elems) {
        elem = elems[e];
        str = original_jquery_string + ' ';
        if ('tag' in elem) {
            str += elem.tag;
        }
        for (var a in elem.attr) {
            str += '[' + a + '="' + elem.attr[a] + '"]'
        }

        if(html_str_to_compare != "body")
            html_str_to_compare = "<container>" + html_str_to_compare + "</container>"
        result = $(html_str_to_compare).find(str);
        //if(result.length==0)
        //    result = $(html_str_to_compare).filter(str);
        console.log("$('"+html_str_to_compare+"').filter('"+str+"')");
        if (result.length == 1 | (!each_tag_is_unique & result.length > 1)) {
            returned = check_html(
                elem.children,
                str,
                each_tag_is_unique, html_str_to_compare)
            if (returned.status == 'error')
                return returned;
        } else
        if (result.length == 0)
            return ({
                status: 'error',
                message: 'No html tag found for the following jquery query:' +
                    str
            });
        else
            return ({
                status: 'error',
                message: 'Multiple tags corresponding to the jquery query: ' +
                    str +
                    '.Set parameter each_tag_is_unique=false to allow it.'
            });
    }
    return ({
        status: 'ok',
        message: 'ok'
    })
}

function trimSpaces(s) {
    s = s.replace(/(^\s*)|(\s*$)/gi, "");
    s = s.replace(/\s{2,}/gi, " ");
    //s = s.replace(/\n /,"\n");
    //s = s.replace(/\n{3,}/,"\n");
    return s
}

function getHtmlFixtureFromServer(url, callback=null) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function(response) {
            $('#qunit-fixture').html(response);
            if(callback!=null)
                callback(response);
        },
    })
}

function get_clone(){
    return function clone(obj) {console.log(222222222);
        if(isArray(obj))
            return $.extend(true, [], obj)
        else if(typeof(obj) == "string")
            return obj
        else
            return $.extend(true, {}, obj)
    }
}

function isArray(a){
    return Object.prototype.toString.call( a ) == '[object Array]';
}

function control_steps(response, status, ajaxObject, current_step, steps,
    cnt_validated_urls_for_current_step,assert) {

    console.log('\n\n--------------------- response received : -------------------------- ');
    console.log('url: ',ajaxObject.url,'\nresponse: ',response,'\nstatus: ',status,'\najaxObject: ',ajaxObject);

    if(status != "success")
        assert.ok(false,'Request to server failed. See in the Network console and debug server')

    else{

        if (current_step.val > steps.length){
            assert.ok(false,'We are currently in step ' + current_step.val +
                ', but this step in not configured in variable "steps"');
        }else{

            var urls_of_this_step = steps[current_step.val - 1].urls,
                control_function = steps[current_step.val - 1].control,
                after_step_function = steps[current_step.val - 1].whenFinished,
                url = ajaxObject.url;

            console.log("step " + current_step.val + ", called: " + url);
            if (urls_of_this_step.indexOf(url) >= 0) {
                console.log("this url was expected");
                cnt_validated_urls_for_current_step.val++;
                if (control_function)
                    control_function(url, urls_of_this_step, response, status,
                        ajaxObject);
                if (cnt_validated_urls_for_current_step.val == urls_of_this_step.length) {
                    if (after_step_function)
                        after_step_function(urls_of_this_step);
                    current_step.val++;
                    cnt_validated_urls_for_current_step.val = 0;
                    console.log("All the expected urls are sent, going to step ",current_step.val)
                }
            } else {
                console.log("Becarreful, in step " + current_step.val +
                    ", this url was called without being expected by the test: " +
                    url);
            }
        }
    }
};
// jQuery Deparam - v0.1.0 - 6/14/2011
// http://benalman.com/
// Copyright (c) 2011 Ben Alman; Licensed MIT, GPL
function set_deparam(){
(function($) {
  // Creating an internal undef value is safer than using undefined, in case it
  // was ever overwritten.
  var undef;
  // A handy reference.
  var decode = decodeURIComponent;

  // Document $.deparam.
  var deparam = $.deparam = function(text, reviver) {
    // The object to be returned.
    var result = {};
    // Iterate over all key=value pairs.
    $.each(text.replace(/\+/g, ' ').split('&'), function(index, pair) {
      // The key=value pair.
      var kv = pair.split('=');
      // The key, URI-decoded.
      var key = decode(kv[0]);
      // Abort if there's no key.
      if ( !key ) { return; }
      // The value, URI-decoded. If value is missing, use empty string.
      var value = decode(kv[1] || '');
      // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
      // into its component parts.
      var keys = key.split('][');
      var last = keys.length - 1;
      // Used when key is complex.
      var i = 0;
      var current = result;

      // If the first keys part contains [ and the last ends with ], then []
      // are correctly balanced.
      if ( keys[0].indexOf('[') >= 0 && /\]$/.test(keys[last]) ) {
        // Remove the trailing ] from the last keys part.
        keys[last] = keys[last].replace(/\]$/, '');
        // Split first keys part into two parts on the [ and add them back onto
        // the beginning of the keys array.
        keys = keys.shift().split('[').concat(keys);
        // Since a key part was added, increment last.
        last++;
      } else {
        // Basic 'foo' style key.
        last = 0;
      }

      if ( $.isFunction(reviver) ) {
        // If a reviver function was passed, use that function.
        value = reviver(key, value);
      } else if ( reviver ) {
        // If true was passed, use the built-in $.deparam.reviver function.
        value = deparam.reviver(key, value);
      }

      if ( last ) {
        // Complex key, like 'a[]' or 'a[b][c]'. At this point, the keys array
        // might look like ['a', ''] (array) or ['a', 'b', 'c'] (object).
        for ( ; i <= last; i++ ) {
          // If the current key part was specified, use that value as the array
          // index or object key. If omitted, assume an array and use the
          // array's length (effectively an array push).
          key = keys[i] !== '' ? keys[i] : current.length;
          if ( i < last ) {
            // If not the last key part, update the reference to the current
            // object/array, creating it if it doesn't already exist AND there's
            // a next key. If the next key is non-numeric and not empty string,
            // create an object, otherwise create an array.
            current = current[key] = current[key] || (isNaN(keys[i + 1]) ? {} : []);
          } else {
            // If the last key part, set the value.
            current[key] = value;
          }
        }
      } else {
        // Simple key.
        if ( $.isArray(result[key]) ) {
          // If the key already exists, and is an array, push the new value onto
          // the array.
          result[key].push(value);
        } else if ( key in result ) {
          // If the key already exists, and is NOT an array, turn it into an
          // array, pushing the new value onto it.
          result[key] = [result[key], value];
        } else {
          // Otherwise, just set the value.
          result[key] = value;
        }
      }
    });

    return result;
  };

  // Default reviver function, used when true is passed as the second argument
  // to $.deparam. Don't like it? Pass your own!
  deparam.reviver = function(key, value) {
    var specials = {
      'true': true,
      'false': false,
      'null': null,
      'undefined': undef
    };

    return (+value + '') === value ? +value // Number
      : value in specials ? specials[value] // true, false, null, undefined
      : value; // String
  };

}(jQuery));
}