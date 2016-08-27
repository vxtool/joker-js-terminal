var Joker = {
  $container : null,
	text       : null,
	countTimer : null,
	index      : 0,
	speed      : 3,
	file       : "./assets/file.txt",
	init: function(){
  	countTimer = setInterval(function(){
      Joker.updateLastCharacter();
    },500);

    Joker.$container = document.querySelector("#terminal");

    var request = new XMLHttpRequest();
    request.open('GET', Joker.file, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = request.responseText;
        Joker.text = data;
      }
    };
    request.send();
	},

	write: function(str){
		Joker.$container.innerHTML =  Joker.$container.innerHTML + str;
		return false;
	},

	addContent: function(key){
		if(Joker.text){
			var cont = Joker.$container.innerHTML;

      if(cont.substring( cont.length-1, cont.length ) == "|"){
				Joker.$container.innerHTML = Joker.$container.innerHTML.substring( 0, cont.length-1 );
      }

      if(key.keyCode != 8){
				Joker.index += Joker.speed;
			} else {
				if(Joker.index > 0) {
					Joker.index -= Joker.speed;
        }
			}
			var text = Joker.$container.innerHTML = Joker.text.substring( 0, Joker.index );

			var rtn = new RegExp("\n", "g");
			var rts = new RegExp("\\s", "g");
			var rtt = new RegExp("\\t", "g");
      var rtp = new RegExp("__", "g");

      Joker.$container.innerHTML = text.replace(rtn,"<br/>").replace(rtt,"&nbsp;&nbsp;&nbsp;&nbsp;").replace(rts,"&nbsp;").replace(rtp," ");

      window.scrollBy(0,50);
		}
		if ( key.preventDefault && key.keyCode != 122 ) {
			key.preventDefault()
		};

		if(key.keyCode != 122){
			key.returnValue = false;
		}
	},

	updateLastCharacter:function(){
		var cont = Joker.$container.innerHTML;
		if(cont.substring( cont.length-1 ,cont.length )=="|")
			Joker.$container.innerHTML =  Joker.$container.innerHTML.substring( 0, cont.length-1 );
		else
			this.write("|");
	}
}

document.addEventListener('DOMContentLoaded', function(){
  Joker.init();
  document.addEventListener('keydown', function( event ){
    Joker.addContent( event );
  });
});
