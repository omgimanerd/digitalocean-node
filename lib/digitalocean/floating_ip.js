(function() {
  var slice = [].slice,
    util = require('./util');

  /**
    * Floating IP resource
    * @class FloatingIp
    */
  var FloatingIp = (function() {
    function FloatingIp(client) {
      this.client = client;
    }

    /**
     * List Floating IP objects.
     *
     * @param {(number|object)} [page or queryObject] - page number to retrieve or key value pairs of query parameters
     * @param {number} [perPage] - number of result per page to retrieve
     * @param {listRequestCallback} [callback] - callback that handles the response
     * @memberof FloatingIp
     */
    FloatingIp.prototype.list = function() {
      var args = util.extractListArguments(arguments, 0);

      return this.client.get.apply(this.client, ['/floating_ips', {}].concat(slice.call(args.params), [200, 'floating_ips', args.callback]));
    };

    /**
     * Create a floating IP object.
     *
     * @param {object} attributes - The attributes with which to create the floating ip. See the {@link https://developers.digitalocean.com/documentation/v2/#floating-ips|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof FloatingIp
     */
    FloatingIp.prototype.create = function(attributes, callback) {
      return this.client.post('/floating_ips', attributes, 202, 'floating_ip', callback);
    };

    /**
     * Get the identified floating ip object.
     *
     * @param {string} ip - The IP of the floating ip to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof FloatingIp
     */
    FloatingIp.prototype.get = function(ip, callback) {
      var url = util.safeUrl('floating_ips', ip);
      return this.client.get(url, {}, 200, 'floating_ip', callback);
    };

    /**
     * Delete the identified floating ip object.
     *
     * @param {string} ip - The ip of the floating ip to delete
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof FloatingIp
     */
    FloatingIp.prototype.delete = function(ip, callback) {
      var url = util.safeUrl('floating_ips', ip);
      return this.client.delete(url, {}, 204, [], callback);
    };

    /**
     * List of action objects.
     *
     * @param {string} ip - The IP of the floating ip for which to retrieve actions
     * @param {(number|object)} [page or queryObject] - page number to retrieve or key value pairs of query parameters
     * @param {number} [perPage] - number of result per page to retrieve
     * @param {listRequestCallback} [callback] - callback that handles the response
     * @memberof FloatingIp
     */
    FloatingIp.prototype.listActions = function() {
      var args = util.extractListArguments(arguments, 1);
      var url = util.safeUrl('floating_ips', args.identifier, 'actions');

      return this.client.get.apply(this.client, [url, {}].concat(slice.call(args.params), [200, 'actions', args.callback]));
    };

    /**
     * Get the identified action object.
     *
     * @param {strint} ip - The IP of the floating ip for which to retrieve the action
     * @param {number} id - The id of the action to retrieve
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof FloatingIp
     */
    FloatingIp.prototype.getAction = function(ip, id, callback) {
      var url = util.safeUrl('floating_ips', ip, 'actions', id);
      return this.client.get(url, {}, 200, 'action', callback);
    };

    /**
     * Create an action on the identified floating ip.
     *
     * @param {strint} ip - The IP of the floating ip for which to create the action
     * @param {string|object} parametersOrType - The name of the action to create or an object with key value pairs of parameters.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof FloatingIp
     */
    FloatingIp.prototype.action = function(ip, parametersOrType, callback) {
      var parameters;

      if(typeof parametersOrType === 'string') {
        parameters = { type: parametersOrType };
      } else {
        parameters = parametersOrType;
      }

      var url = util.safeUrl('floating_ips', ip, 'actions');
      return this.client.post(url, parameters, 201, 'action', callback);
    };

    /**
     * If the identified floating IP is assigned to a Droplet, unassign it.
     *
     * @param {strint} ip - The IP of the floating ip for which to create the action
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof FloatingIp
     */
    FloatingIp.prototype.unassign = function(ip, callback) {
      return this.action(ip, 'unassign', callback);
    };

    /**
     * Assign the identified floating IP to a Droplet.
     *
     * @param {strint} ip - The IP of the floating ip for which to create the action
     * @param {number|object} parametersOrDropletId - If a number, the identifier of the Droplet. Otherwise, an object with required keys of `droplet_id`. See the {@link https://developers.digitalocean.com/documentation/v2/#assign-a-floating-ip-to-a-droplet|official docs} for valid attributes.
     * @param {requestCallback} [callback] - callback that handles the response
     * @memberof FloatingIp
     */
    FloatingIp.prototype.assign = function(ip, parametersOrDropletId, callback) {
      var parameters;

      if(typeof parametersOrDropletId !== 'object') {
        parameters = {
          droplet_id: parametersOrDropletId
        };
      } else {
        parameters = parametersOrDropletId;
      }
      parameters.type = 'assign';

      return this.action(ip, parameters, callback);
    };

    return FloatingIp;
  })();

  module.exports = FloatingIp;
}).call(this);
