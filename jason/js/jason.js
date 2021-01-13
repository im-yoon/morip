;(function(jQuery,window,document,undefined){
    var jason = {
        init: function(){
            var that = this;

            that.headerFn();
            that.section1Fn();
            that.section2Fn();
            that.section3Fn();
            that.section4Fn();
            that.section5Fn();

        },
        headerFn:function(){
            var that = null;
            var _window = $(window);
            var _header = $('#header');
            var _scroll = false; 
            var t = false;  // true =0
            var m = 0; //메뉴클릭 안한 상태
            var menuBar = $('.menu-bar');
            
                
                _header.on({
                    mouseenter:function(){
                        that = $(this);
                        that.addClass('addHeader');
                    },
                    mouseleave:function(){
                        that = $(this);
                        if( _scroll === false && m === 0){ //두조건 모두 만족 시 해더 배경 없어짐
                            that.removeClass('addHeader');
                        }
                        
                    }
                });

                _window.scroll(function(){
                    that = $(this);
                    if( that.scrollTop() >= 30){
                        _scroll = true; //스크롤 30px 이상인 경우 true값 변경
                        _header.addClass('addHeader');
                        if(t===false){
                            t=true; //false 이면 true로 바꾸고 실행
                            var headerH =$('#header').height();
                            $('html,body').stop().animate({scrollTop:$('#section2').offset().top-headerH},600,'easeInOutExpo');
                        }
                        
                    }
                    else{
                        t=false; //30이하 로 올하 갔을때 false가되서 또 실행가능
                        _scroll = false; //스크롤 30px 이하인 경우 false 변경
                        if( m==0 ){ //햄버거메뉴 클릭안된 상태만 헤더 배경 삭제
                            _header.removeClass('addHeader');
                        }
                        
                    }
                });

             
                
               //햄버거 메뉴 클릭하면 기억하는 변수 설정
               //NAV 네비게이션 이벤트
               menuBar.on({
                    click : function(e){
                        e.preventDefault();
                        if(m==0){
                            m = 1;
                            $('#nav').stop().animate({top:124},300);
                        }
                        else{
                            m=0;
                            $('#nav').stop().animate({top:-124},300);
                        }
                        $(this).toggleClass('addBtn');
                        
                        

                    }
                });
                
                //메인버튼 이벤트
                $('.mainBtn').on({
                    mouseenter: function(){
                        $('.sub').stop().slideUp(100);
                        $(this).next('.sub').stop().slideDown(300);
                    }
                });

                //서브 메뉴 사라지는 효과 이벤트
                //NAV를 벗어나면 사라짐
                $('#nav').on({
                    mouseleave: function(){
                        $('.sub').stop().slideUp(300); 
                    }
                });

        },
        section1Fn:function(){
            var cnt=0; //증가변수
            var n = $('#section1 .slide').length-2; //더한 갯수 만큼 빼준다.
            var _slide =  $('#section1 .slide');
            var _nextBtn = $('#section1 .next-btn');
            var _prevBtn = $('#section1 .prev-btn');
            var _slideWrap = $('#section1 .slide-wrap');
            var _pageBtn = $('#section1 .page-btn');
            var _slideCon = $('#section1 .slide-container');
            var _smoothBtn = $('#section1 .smooth-btn');
            var setId = null; //값 할당받는 변수
            var setId2 = null; 
            var $second = 4;
            var tCnt = 0;

        ///////////////////slide/////////////////////////////////////

            //메인 슬라이드 함수
            function mainSlideFn(){
                _slideWrap.stop().animate({left:-(100*cnt)+'%'},600, function(){ //콜백함수
                    if(cnt>n-1){cnt=0;} //n개인 경우 n-1
                    if(cnt<0){cnt=n-1;}
                    _slideWrap.stop().animate({left:-(100*cnt)+'%'},0); //초기화
                });
                //페이지버튼 함수 
                pageBtnFn(cnt);
            }
            function pageBtnFn(z){
                z==n?z=0:z; //n(4) = z>n-1?z=0:z;
                z==-1?z=n-1:z; //3=n(4)-1
                //console.log(z);
                _pageBtn.removeClass('addCurrent');
                _pageBtn.eq(z).addClass('addCurrent');
            }

            function nextCountFn(){
                cnt++;
                mainSlideFn();
            }

            function prevCountFn(){
                cnt--;
                mainSlideFn();
            }

            //자동 플레이
            function autoTimerFn(){
                setId = setInterval(nextCountFn,1000*$second); // 클릭 후 $second 후 자동 실행 위해 
            }

            //버튼 이벤트 발생 시 Timer control
            function timerFn(){
                tCnt=0; //초기화 누르면 0
                clearInterval(setId2); //중간 버튼 클릭시 중지 후 clear

                setId2 =setInterval(function(){
                    tCnt++; //1초에 1씩 증가
                    console.log(tCnt);
                    if(tCnt>$second){ //4초 경과 후에 진행
                        clearInterval(setId2);
                        nextCountFn();
                        autoTimerFn();
                        
                    }
                },1000);
            }

            //페이지 버튼 이벤트 
            _pageBtn.each(function(index){
                $(this).on({
                    click : function(e){
                        e.preventDefault();
                        clearInterval(setId);
                        timerFn();
                        cnt = index;
                        mainSlideFn();
                    }
                });
            });
                
            //다음 슬라이드 버튼 클릭 이벤트
            _nextBtn.on({
                click: function(e){
                    e.preventDefault();
                    clearInterval(setId);
                    timerFn();
                    if(!_slideWrap.is(':animated')){
                        nextCountFn();
                    } 
                }
            });

            //이전 슬라이드 버튼 클릭 이벤트
            _prevBtn.on({
                click: function(e){
                    e.preventDefault();
                    clearInterval(setId);
                    timerFn();
                    if(!_slideWrap.is(':animated')){
                        prevCountFn();
                    }   
                }
            });

            //터치 스와이프 이벤트
            _slideCon.swipe({
                swipeLeft: function(e){ //다음 슬라이드
                    e.preventDefault(); //href = javascript 안써서 event 사용
                    clearInterval(setId);
                    timerFn();
                    if(!_slideWrap.is(':animated')){
                        nextCountFn();
                    } 
                },
                swipeRight: function(e){ //이전 슬라이드 
                    e.preventDefault();
                    clearInterval(setId);
                    timerFn();
                    if(!_slideWrap.is(':animated')){
                        prevCountFn();
                    }   
                }
            });

            setTimeout(autoTimerFn,10);

        ///////////////////slide/////////////////////////////////////

        ///////////////////smooth button/////////////////////////////
        _smoothBtn.on({
            click: function(e){
                e.preventDefault();
                var headerH = $('#header').height();
                var url = $(this).attr('href');

                    $('html,body').stop().animate({scrollTop:$(url).offset().top-headerH },600,'easeInOutExpo');
            }
        });
        ///////////////////smooth button///////////////////////////////
        var winW =$(window).width();
        var winH =$(window).height();

            function resizeFn(){
                winW =$(window).width(); //리얼하게 너비
                winH =$(window).height(); //안 넣어주면 새로고침해야 바뀜
                $('#section1').css({height:winH}); //리얼하게 적용(즉시)
                $('#section2').css({marginTop:winH});
                _slide.css({width:winW});
                mainSlideFn();
            }

            setTimeout(resizeFn,10);

            $(window).resize(function(){
                resizeFn();
            });
           


        },
        section2Fn:function(){
            var _win = $(window);
            var _gal = $('.gallery li');
            var _galW = $('.gallery li').width();
            var _galH = _galW * 0.832468967;

                function resizeFn(){
                    _galW = $('.gallery li').width(); //칸 너비
                    _galH = _galW * 0.832468967; //칸 높이 비율 계산
                    _gal.css({height:_galH});
                }

                setTimeout(resizeFn,10);

                _win.resize(function(){
                    resizeFn();
                });

        },
        section3Fn:function(){
            //박스 높이 slide-view box 너비가 1360px 이하이면 자동 설정 높이 설정

            var _win = $(window);
            var _winW = $(window).innerWidth();
            var _slidView = $('#section3 .slide-view');
            var _pageBtnW = $('#section3 .pageBtn').innerWidth();
            var _pageWrap = $('#section3 .page-wrap');
            var _slideBg = $('#section3 .slide-bg-img');
            var _slideBgW = $('#section3 .slide-bg-img').innerWidth();

                
        

                function resizeFn(){
                    _winW = $(window).innerWidth();
                    _pageBtnW  = $('#section3 .pageBtn').innerWidth();
                    _slideBgW  = $('#section3 .slide-bg-image').innerWidth();
                    
                    if(_winW<=1360){
                        _slidView.css({height:_winW*0.419117647}); //1360 570
                        _pageWrap.css({height:_pageBtnW});
                        _slideBg.css({height:_slideBgW});
                    }
                    else{
                        _slidView.css({height:570});
                    }
                }
                
                setTimeout(resizeFn,10);

                _win.resize(function(){
                    resizeFn();
                });
                 
                //페이지 인아웃 반응형 슬라이드 웹개발

                var cnt = 0;
                var setId = null;
                var n        = $('#section3 .slide').length-1; //2 = 3 -1 => index(0,1,2)
                var $nextBtn = $('#section3 .nextBtn');
                var $prevBtn = $('#section3 .prevBtn');
                var $slide   = $('#section3 .slide');
                var $pageBtn = $('#section3 .pageBtn');
                var a = [1,2];

                
                //1. 메인 슬라이드 페이드 아웃 함수//
                //1-1메인 다음 슬라이드 함수
                function mainNextSlideFn(){
                    $slide.css({zIndex:1});
                    $slide.eq(cnt==0?n:cnt-1).css({zIndex:2}); //현재 이전 슬라이드 cnt가 0이되면?n 아니면 cnt-1
                    $slide.eq(cnt).css({zIndex:3}).animate({opacity:0},0).animate({opacity:1},1000); //현재 슬라이드
                    //console.log(cnt); 처음 카운트 점검
                    pageBtnFn();
                }
                //1-2메인 이전 슬라이드 함수
                function mainPrevSlideFn(){
                    $slide.css({zIndex:1,opacity:1}); //초기화 모든 슬라이드 zIndex:1 opacity:1
                    $slide.eq(cnt).css({zIndex:2}); //현재 이전 슬라이드 cnt가 0이되면?n 아니면 cnt-1
                    $slide.eq(cnt==n?0:cnt+1).css({zIndex:3}).animate({opacity:1},0).animate({opacity:0},1000); //현재 슬라이드
                    //console.log(cnt);
                    pageBtnFn();
                }
                //2.카운트 함수 이벤트//
                //2-1.메인 다음 카운트 슬라이드 함수
                function nextCountFn(){
                    cnt++;
                    if(cnt>n){cnt=0}
                    mainNextSlideFn();
                }
                //2-2.메인 이전 카운트 슬라이드 함수
                function prevCountFn(){
                    cnt--;
                    if(cnt<0){cnt=n}
                    mainPrevSlideFn();
                }
                //3. 버튼 클릭 이벤트//
                //3-1 다음 클릭 카운트 슬라이드 함수
                $nextBtn.on({
                    click : function(e){
                        e.preventDefault();
                        nextCountFn();
                    }
                });
                //3-2 이전 클릭 카운트 슬라이드 함수
                $prevBtn.on({
                    click : function(e){
                        e.preventDefault();
                        prevCountFn();
                    }
                });

                //4. 페이지버튼(인디게이터 버튼)이벤트 함수//
                //스토리 보드 : 현재 슬라이드가 
                //첫번째 슬라이드 이면 페이지 버튼 1 : [1]두번째 슬라이드 이미지
                //첫번째 슬라이드 이면 페이지 버튼 2 : [2]세번째 슬라이드 이미지

                //두번째 슬라이드 이면 페이지 버튼 1 : [0]첫번째 슬라이드 이미지
                //두번째 슬라이드 이면 페이지 버튼 2 : [2]세번째 슬라이드 이미지

                //세번째 슬라이드 이면 페이지 버튼 1 : [0]첫번째 슬라이드 이미지
                //세번째 슬라이드 이면 페이지 버튼 2 : [1]두번째 슬라이드 이미지
                function pageBtnFn(){
                    switch(cnt){
                        case 0:
                            //case 0 첫번째 슬라이드인 경우
                            a=[1,2]; //파일 인덱스 번호
                            break;
                        case 1:
                             //case 1 두번째 슬라이드인 경우
                             a=[0,2];
                            break;
                        case 2:
                            //case 2  세번째 슬라이드인 경우
                            a=[0,1]; 
                           
                    }
                    //$pageBtn.eq(0).css({backgroundImage:'url(./img/s3Slide'+a[0]+'.jpg'});
                    //$pageBtn.eq(1).css({backgroundImage:'url(./img/s3Slide'+a[1]+'.jpg'});

                    for(var i=0;i<a.length;i++){
                        $pageBtn.eq(i).css({backgroundImage:'url(./img/s3Slide'+a[i]+'.jpg'});
                    }
                
                }
                /* function pageBtnFn(){
                    switch(cnt){
                        case 0:
                            //case 0 첫번째 슬라이드인 경우
                            a[2,3];
                            $pageBtn.eq(0).css({backgroundImage:'url(./img/s3Slide1.jpg'});
                            $pageBtn.eq(1).css({backgroundImage:'url(./img/s3Slide2.jpg'});
                            break;
                        case 1:
                             //case 1 두번째 슬라이드인 경우
                             a[1,3];
                            $pageBtn.eq(0).css({backgroundImage:'url(./img/s3Slide0.jpg'});
                            $pageBtn.eq(1).css({backgroundImage:'url(./img/s3Slide2.jpg'});
                            break;
                        case 2:
                            //case 2  세번째 슬라이드인 경우
                            a[1,2];
                            $pageBtn.eq(0).css({backgroundImage:'url(./img/s3Slide0.jpg'});
                            $pageBtn.eq(1).css({backgroundImage:'url(./img/s3Slide1.jpg'});

                            break;
                    }

                
                } */

                //5. 페이지버튼(인디게이터 버튼) 클릭 이벤트//
                $pageBtn.each(function(idx){
                        $(this).on({
                            click: function(e){
                                e.preventDefault();
                                //console.log('현재 슬라이드 번호',cnt); //현재 실행중인 슬라이드 번호
                                 //console.log('클릭한 슬라이드 번호',a[idx]); //클릭한 슬라이드 번호

                                var imsi = cnt;
                                    cnt = a[idx];

                                    if(imsi < a[idx] ){ //클릭한 번호가 더 크면 다음 슬라이드
                                        mainNextSlideFn(); //함수 실행 범위(스코프 scope)에 변수 cnt 가 할당
                                    }
                                    else if(imsi > a[idx]){ //클릭한 번호가 더 작으면 이전 슬라이드
                                        mainPrevSlideFn();
                                    }
                                //console.log('현재 슬라이드 번호',cnt); //현재 실행중인 슬라이드 번호
                                //console.log('클릭한 슬라이드 번호',a); //슬라이드 페이지 버튼의 배열 모두 출력
                            }
                        });
                
                });
                



        },
        section4Fn:function(){

            //슬라이드 콘테이너 박스 너비에 따른 슬라이드 3개의 너비구하기
            //1570-40(마진값20*2)=1530
            //1.슬라이드너비는 1570/3=523.3333333
            //반응형으로 슬라이드 컨테이너('.slide-container) 박스 너비 변화에 따른 슬라이드 너비 게산

            var totN       = $('#section4 .slide').length; //10
            var slideN     = 3;//desktop 980초과 3, tablet 980 이하 2,mobile 600 1 
            var $slideCon  = $('#section4 .slide-container');
            var slideW     = $('#section4 .slide-container').innerWidth()/slideN;
            var $slideWrap = $('#section4 .slide-wrap');
            var $slide     = $('#section4 .slide'); 
            var $pageBtn     = $('#section4 .pageBtn'); 
            var $window    = $(window);
            var cnt        = 0;
            var setId      = null;
            var setId2      = null;

                function resizeFn(){
                    if($slideCon.innerWidth()>1024){
                        slideN = 3;
                    }
                    else if($slideCon.innerWidth()>680){
                        slideN = 2;
                    }
                    else{
                        slideN = 1;
                    }
                    slideW = $slideCon.innerWidth()/slideN; //슬라이드 1개의 너비
                    $slideWrap.css({width:(slideW*totN),marginLeft:-(slideW*3)}); //3 4 3
                    $slide.css({width:slideW,height:slideW-40});
                    $slideWrap.stop().animate({left:-(slideW*cnt)},0);//동적:속도를 써서해도 되고 메인함수 호출 해도 됨 / 정적:움직임 없이 하기 위해 0
                }
                setTimeout(resizeFn,10); //처음 로딩 시 1번만
                
                $window.resize(function(){ //크기가 변경 될때만 반응
                    resizeFn();
                });

                //1. 메인슬라이드 함수
                function mainSlideFn(){
                    $slideWrap.stop().animate({left:-(slideW*cnt)},600,'easeOutExpo',function(){
                        if(cnt>3){cnt=0}; //0~3 (4개의 슬라이드)
                        if(cnt<0){cnt=3};
                        $slideWrap.stop().animate({left:-(slideW*cnt)},0);
                    });
                    pageBtnEventFn();
                }
                //2. 다음 카운트 슬라이드 
                function nextCountSlideFn(){
                    cnt++;
                    mainSlideFn();
                }
                //2.2 이전 카운트 슬라이드 함수
                function prevCountSlideFn(){
                    cnt--;
                    mainSlideFn();
                }

                //3. 스와이프 다음/이전 터치 이벤트
                $slideCon.swipe({
                    swipeLeft:function(){
                        timerControlFn();
                        if(!$slideWrap.is(':animated')){ //이벤트가 진행 중이지 않다면 nextCountSlideFn
                            nextCountSlideFn();
                        }
                        
                    },
                    swipeRight:function(){
                        timerControlFn();
                        if(!$slideWrap.is(':animated')){
                            prevCountSlideFn();
                        }
                        
                    }
                });

                //4.페이지버튼 이벤트 함수
                function  pageBtnEventFn(){
                    var z = cnt;
                    if(z>3){z=0}
                    if(z<0){z=3}
                    $pageBtn.removeClass('addPage');
                    $pageBtn.eq(z).addClass('addPage');
                }
                //5.페이지버튼 클릭 이벤트
                $pageBtn.each(function(idx){
                    $(this)
                        .on('click',function(e){
                            e.preventDefault();
                            timerControlFn();
                            cnt = idx; //직접 선택한 슬라이드 번호를 이용 메인 슬라이드 함수 호출
                            mainSlideFn();
                        });

                });
                

                //6.자동 실행 타이머 6초간격
                function autoPlayFn(){
                    setId =setInterval(nextCountSlideFn,6000);
                }

                autoPlayFn();

                //7. 타이머 컨트롤 함수
                function timerControlFn(){
                    var tcnt = 0 ;
                    clearInterval(setId);
                    clearInterval(setId2);
                    setId2 = setInterval(function(){
                        tcnt++;
                        if(tcnt>=6){
                            clearInterval(setId2);
                            nextCountSlideFn();
                            autoPlayFn();
                        }
                    },1000);
                }

        },
        section5Fn:function(){

        }
     
    };
    jason.init();

})(jQuery,window,document);