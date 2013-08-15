var chain=function(){

	var serie=[];
	var c=0;

	//Build functions
	for(var i=0;i<arguments.length;i=i+2){

		serie[c]={};
		var fn=arguments[i];
		var arg=arguments[i+1];
		fn.curry=function(arg){
			var m=this;
			return function(){
				var a=arg.concat(Array.prototype.slice.call(arguments));
				return m.apply(this, a);
			}
		}

		serie[c].cb=arg.splice(arg.length-1)[0];
		serie[c].fn=fn.curry(arg);
		c++;
	}


	//Chain callbacks to next initiator
	for(var i=0;i<(serie.length-1);i++){
		var cb=serie[i].cb;
		serie[i].cb=(function(i, cb){
			return function(){
				cb.call();
				serie[i+1].fn.call(serie[i+1].fn,serie[i+1].cb);
			}
		})(i, cb);
	}
	serie[0].fn.call(serie[0].fn,serie[0].cb);
}
