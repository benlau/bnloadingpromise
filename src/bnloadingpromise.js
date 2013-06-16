
/** Angular Loading Promise
 * 
 */

(function() {
    "use strict";

    // Keep the design and usage as simple as possible. Avoid concat 
    // of Javascript file before use. 

    var module = angular.module("bn.loadingPromise",[]);
    
    /** bnLoadingPromise service
     */
    
    module.factory("bnLoadingPromise",["$q" , function($q) {

        /** Tracking the promises within this scope
         */

        function Tracker(scope) {
            this._scope = scope;        
            this._progress = {
                step : 0,
                total : 0    
            };
            this._defer = $q.defer();
            
            // State of the tracker. Possible values : ["loading","done"]
            this._state = "loading"; 
            
            // Result of the promise. Possible values : ["success","error"]        
            this._result = null;

            // Reson of fail. (It will set only if "error")
            this._reason = null;
        }
        
        /** Return a progress object
         */
        
        Tracker.prototype.progress = function() {
            return this._progress;        
        };
        
        /** Return the promise of this tracker
         */
        
        Tracker.prototype.promise = function() {
            return this._defer.promise;
        };
        
        Tracker.prototype.state = function() {
            return this._state;
        };
        
        Tracker.prototype.result = function() {
            return this._result;   
        };
        
        /** Add a promise
         */
        
        Tracker.prototype.add = function(promise) {
            // This function is usually called by bnPromise, but 
            // it do allow user to add another promise object.
            
            // Therefore, the $apply/$digest may either be 
            // running of not running.
            
            var self = this;
            
            if (this._state == "done") {
                // The tracker is already done. Can't add more.
                console.error("bnLoadingPromise: It can't add promise to a tracker which is already 'done'");
                return;
            }
            
            this._progress.total++;
            
            var p = promise.then(function() { // Reference: $q.all()
                self._progress.step++; 
                if (self._progress.step === self._progress.total) {
                    self._state = "done";
                    self._result = "success";
                    self._defer.resolve();
                }
                self.refresh();
            },function(reason) {
                self._state = "done";
                self._result = "error";
                self._reason = reason;
                
                self._defer.reject(reason);
                self.refresh();
            });

            this.refresh();
        };
        
        Tracker.prototype.refresh = function() {
            if(!this._scope.$$phase) {
                this._scope.$apply();            
            }
        };
        
        return {
            /** Create or get the tracker assoicated with a scope
             */
            tracker : function(scope) {
                var bnLoadingPromiseTrackerName ="$a764ebnLoadingPromiseTracker";
                
                if (!scope.hasOwnProperty(bnLoadingPromiseTrackerName) ){
                    var tracker = new Tracker(scope);
                    scope[bnLoadingPromiseTrackerName] = tracker;
                    scope.$on("destroy",function() {
                        delete scope[bnLoadingPromiseTrackerName];
                    });
                }
                return scope[bnLoadingPromiseTrackerName];
            }
        };

    }]);
    
    /** bnPromise - Register the element to be tracked
     */
    
    module.directive("bnPromise",function() {
        
        function Controller($scope,$element,$q,bnLoadingPromise) {
            var tracker = bnLoadingPromise.tracker($scope);        
            var q = $q.defer();
            tracker.add(q.promise);
            
            angular.element($element).bind("load",function() {
                q.resolve();
                $scope.$apply();
            }); 

            angular.element($element).bind("error",function() {
                q.reject();
                $scope.$apply();
            });
        }
        
        Controller.$inject = ["$scope","$element","$q","bnLoadingPromise"];
        
        var def = {
            controller : Controller,
            restrict : 'A'
        };
        
        return def;

    });

    /** Set the display css attribute of an element according to the
     * condition of tracker to value.
     * 
     * @param {object} element - The element to take effect
     * @param {tracker} tracker - The tracker
     * @param {string} condition - The condition to triggle visilbe or hidden
     * @param {array} value - An array of css value. The first one will be used if the condition match
     */

    function setDisplayCss(element,tracker,condition,values) {
        var index,
             css = "hidden";
            
        if (!condition) {
            condition = "done";    
        }
        
        if (tracker.state() == condition ||
            tracker.result() == condition) {
            index = 0;
        } else {
            index = 1;   
        }
        
        angular.element(element).css("display",values[index]);
    }
    
    /** A factory to construct a controller type to handle the visiblity change
     * for nxPromiseShow and nxPromiseHide
     */
    function visibilityController(show) {
        
        function Controller($scope,$element,bnLoadingPromise) {
            var tracker = bnLoadingPromise.tracker($scope);
            var self = this;
            var values = [];
            
            var display = angular.element($element).css("display"); // save the default display type
            
            if (show) {
                values = [display,"none"];
            } else {
                values = ["none",display];
            }
            
            $scope.$watch(function() {
                return tracker.state() + ":" + tracker.result();
            } ,function() {
                setDisplayCss($element,tracker,self.condition,values);
            });
        }
        
        Controller.$inject = ["$scope","$element","bnLoadingPromise"];

        return Controller;        
    }

    
    /** bnPromiseShow 
     * 
     * The element should be show if the condition match.
     */
    
    module.directive("bnPromiseShow",function() {
        
        var def = {
            controller : visibilityController(true),
            restrict : 'A',
            link : function(scope,element,attr,controller ) {
                controller.condition = attr.bnPromiseShow;
            }
        };
        
        return def;        
    });

    /** bnPromiseHide
     * 
     * The element should be hidden if the condition match.
     */
    
    module.directive("bnPromiseHide",function() {
        
        var def = {
            controller : visibilityController(false),
            restrict : 'A',
            link : function(scope,element,attr,controller ) {
                controller.condition = attr.bnPromiseHide;
            }
        };
        
        return def;        
    });

})();
