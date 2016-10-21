var eventTransmitter = function(e){
	switch( e.eventType ){
	case 'mousemove':
		if (typeof window.onmousemove == 'function'){
			window.onmousemove(e);
		}
	break;
	case 'keydown':
		if (typeof window.onkeydown == 'function'){
			window.onkeydown(e);
		}
	break;
	case 'keyup':
		if (typeof window.onkeyup == 'function'){
			window.onkeyup(e);
		}
	break;
	}
}

/* Flash editer */
var flashes = document.getElementsByTagName('object');
for ( var i = 0; i < flashes.length; i++ ){
	var params = flashes[i].querySelectorAll('param[name="wmode"]');
	if( params.length == 0 ){
		var param = document.createElement('param');
		param.setAttribute('name', 'wmode');
		param.setAttribute('value', 'opaque');
		if( flashes[i].firstChild ){
			flashes[i].insertBefore(param, flashes[i].firstChild);
		}else{
			flashes[i].appendChild(param);
		}
	}else{
		if( params[0].getAttribute('value') == 'window' ){
			params[0].setAttribute('value', 'opaque');
		}
	}
}
var embeds = document.getElementsByTagName('embed');
for ( var i = 0; i < embeds.length; i++ ){
	if( embeds[i].getAttribute('wmode') == 'window' || !embeds[i].getAttribute('wmode') ){
		embeds[i].setAttribute('wmode', 'opaque');
	}
}
/* Flash editer */

if( window === window.parent ){

  var FS433_state = false;
  var FS433_fullscreen = false;
  var FS433_ready = false;
  var FS433_timer = false;
  var FS433_laststate = 'hide';
  var FS433_topOffset = 20;
  var FS433_tabs = [];
  var FS433_reg = /^(http|https|ftp|file){1}:\/\/(([0-9a-zA-Z\-]*\.)*)*(aero|biz|com|coop|edu|eu|gov|info|int|mil|museum|name|net|org|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)(\/){1}.*$/

  var FS433_KEY_ACTIVATE = 190;
  var FS433_KEY_ACTIVATE2 = 192;
  var FS433_KEY_CTRL = 17;
  var FS433_KEY_ESC = 27;
  var FS433_KEY_UP = 38;
  var FS433_KEY_DOWN = 40;
  var FS433_KEY_ENTER = 13;

  var FS433_wnd = {
    obj: false,
    search: false,
    tpl: function(){
			var body = document.getElementsByTagName("BODY")[0];

      var t1 = document.createElement('div');
      t1.setAttribute('id', 'fullScreener_Bar');

			var t2 = document.createElement('div');
      t2.setAttribute('class', 'backGrd');

			// back - кнопка назад (создается)
      var back = document.createElement('div');
      back.setAttribute('id', 'fullScreener_back');
      // forward - кнопка вперед (создается)
      var forward = document.createElement('div');
      forward.setAttribute('id', 'fullScreener_forward');
      // reload кнопка перезагрузка (создается)
      var reload = document.createElement('div');
      reload.setAttribute('id', 'fullScreener_reload');
      // home - кнопка домой (создается)
      var home = document.createElement('div');
      home.setAttribute('id', 'fullScreener_home');

      var bar = t1;
      bar.addEventListener('click', function(e){ e.stopPropagation(); });

      // читает историю открытия окон
      if( window.history.length > 1 ){
        back.className = '';
        forward.className = '';
        // действие при клике по кнопке "Назад"
        back.onclick = function(){
          window.history.back();
        }
        // действие при клике по кнопке "Вперед"
        forward.onclick = function(){
          window.history.forward();
        }
      }
      // действие при клике по кнопке "Перезагрузка"
      reload.onclick = function(){
        window.location.reload();
      }
      // действие при клике по кнопке "Закрыть"
      close.onclick = function(){
        window.close();
      }
      // действие при клике по кнопке "Домой"
      home.onclick = function(){
        window.location = "https://www.gosuslugi.ru/"
      }

      t1.appendChild(t2);
      t1.appendChild(back);
      t1.appendChild(forward);
      t1.appendChild(reload);
      t1.appendChild(home);

      this.obj = t1;
      body.appendChild(this.obj);

      return true;
    },
    top: 0
  }

	FS433_wnd.obj =  {style: false};
  var FS433_TabHeight = 28;
  var FS433_TabListHeight = 0;

  // Функция показа бара
  var FS433_show = function(){
    FS433_wnd.top = 0;
    FS433_topOffset = 46 + FS433_wnd.top;
    FS433_wnd.obj.style.top = FS433_wnd.top+'px';
  }
  // Функция  скрытия бара
  var FS433_hide = function(){
    FS433_wnd.top = -80;
    FS433_topOffset = 83 + FS433_wnd.top;
    FS433_wnd.obj.style.top = FS433_wnd.top+'px';
  }
  var FS433_show_int = function(){
    if( FS433_wnd.top < -4 ){
      FS433_wnd.top += 4;
      FS433_topOffset = ( 46 + FS433_wnd.top ) + 4;
      FS433_wnd.obj.style.top = FS433_wnd.top+'px';
    }else{
      FS433_wnd.top = 0;
      FS433_topOffset = 46 + FS433_wnd.top;
      FS433_wnd.obj.style.top = FS433_wnd.top+'px';
    }
  }
  var FS433_show_go = function(){
    FS433_wnd.top = 0;
    FS433_topOffset = ( 76 + FS433_wnd.top ) + 4;
    FS433_wnd.obj.style.top = FS433_wnd.top+'px';
  }
  var FS433_hide_int = function(){
    if( FS433_wnd.top > -44 ){
      FS433_wnd.top -= 2;
      FS433_topOffset = 49 + FS433_wnd.top;
      FS433_wnd.obj.style.top = FS433_wnd.top+'px';
    }else{
      FS433_wnd.top = -46;
      FS433_topOffset = 49 + FS433_wnd.top;
      FS433_wnd.obj.style.top = FS433_wnd.top+'px';
    }
  }


  var FS433_init = function(){
    FS433_wnd.tpl();
	/*
    window.addEventListener('mousemove', function(e){
      if( FS433_state ){
        if( e.screenY <= FS433_topOffset ){
          if( FS433_laststate == 'hide' ){
            FS433_laststate = 'show';
            FS433_show();
          }
        }else{
          if( FS433_laststate == 'show' ){
            FS433_laststate = 'hide';
            FS433_hide();
          }
        }
      }
    });*/
    FS433_ready = true;
  };

  chrome.extension.onMessage.addListener(function(data, sender, sendResponse) {
    if ((data.query == 'list')&&FS433_state) {
      FS433_tabs = data.body;
      FS433_suggested = data.suggest;
      FS433_showTabs();
      FS433_Tabs_Obj.table.style.display = 'table';

      FS433_Tabs_Obj.suggest.focus();
    } else if (data.query == 'fullscreen') {
      FS433_fullscreen_change(data.status);
    } else if ((data.query == 'favorites')&&FS433_state) {
      FS433_renderFavorites(data.body);
    }
  });


  var FS433_fullscreen_change = function(fullscreen){
    if( fullscreen ){
      FS433_state = true;
      FS433_fullscreen = fullscreen;
      if( !document.getElementById('fullScreener_Bar') ){
        FS433_ready = false;
        FS433_init();
      }else{
        FS433_show_go();
      }
    } else {
      FS433_state = false;
      FS433_hide();
    }
  };
  // Изменение размеров окна
  var FS433_resize_timer = undefined;
  var FS433_resize_query = function(){
    chrome.extension.sendMessage({query: 'check_window_state'});
  };
  var FS433_resize = function(){
    clearTimeout(FS433_resize_timer);
    FS433_resize_timer = setTimeout(FS433_resize_query, 500);
  };
  window.addEventListener('resize', FS433_resize);
  FS433_resize();

  var FS433_focus_timeout = undefined;

  /*
  window.addEventListener('keydown', function(e){
    if( ( e.keyCode == 122 ) && FS433_state ){
      if( !FS433_ready ){
        FS433_init();
      }
      FS433_show_go();
      FS433_focus_timeout = setTimeout(function(){
        FS433_wnd.search.focus();
        FS433_wnd.search.select();
      }, 400);
      e.stopPropagation();
      return false;
    } else {
      FS433_hide();
    }

    if( ((e.keyCode == FS433_KEY_ACTIVATE)||(e.keyCode == FS433_KEY_ACTIVATE2)) && ( e.metaKey || e.ctrlKey ) && (e.keyIdentifier!="U+0060") ){
      if( !FS433_tabstatus ){
        FS433_tabstatus = true;
        FS433_state = true;
        chrome.extension.sendMessage({query: 'list'}, null);
      }
    }
    if (e.keyCode == FS433_KEY_ESC) {
      if (FS433_tabstatus) {
        e.preventDefault();
      }
      FS433_tabstatus = false;
      FS433_hideTabs();
    }
  });

  window.addEventListener('keyup', function(e){
    if( e.keyCode == FS433_KEY_CTRL ){
      if( FS433_tabstatus && FS433_fullscreen ){
        FS433_tabstatus = false;
        if(
          FS433_tabsready &&
          FS433_tabs &&
          (FS433_Tabs_Obj.hover != -1)
        ){
          var li = FS433_Tabs_Obj.ul.querySelector('.fullScreener_hover');
          if (li){
            var id = parseInt(li.getAttribute('rel'));
            if (id){
              chrome.extension.sendMessage({query: 'tab', id:id});
            }
          }
        }
        FS433_hideTabs();
      }
    }
  });*/

}else{
	window.onmousemove = function(e){
		chrome.extension.sendMessage({query: 'event', e: {eventType: 'mousemove', screenX: e.screenX, screenY: e.screenY}});
	}
  window.onkeydown = function(e){
		chrome.extension.sendMessage({query: 'event', e: {eventType: 'keydown', keyCode: e.keyCode, ctrlKey: e.ctrlKey}});
	}
	window.onkeyup = function(e){
		chrome.extension.sendMessage({query: 'event', e: {eventType: 'keyup', keyCode: e.keyCode, ctrlKey: e.ctrlKey}});
	}
}
