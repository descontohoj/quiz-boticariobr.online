// jQuery function
$(document).ready(function() {

    // init Timer
    (function initTimer() {
        if ($('.js-timer').length) {

            let timerJs

            timerJs = $('.js-timer').FlipClock({
            clockFace: 'DailyCounter',
            autoStart: false, 
            countdown: true , 
            language:'ru-ru', 
            // callbacks: { 
            // stop: function() {
            // }
            });

            timerJs.setTime(12230); 
            timerJs.setCountdown(true); 
            timerJs.start();
        };
    }());

    // quiz
    (function quiz() {
        $('.js-quiz').click(function() {

            const thisSlide = $(this).parents('.quiz-block__item').attr("data-id");

            $(this).parents('.quiz-block__item').fadeOut("slow", function () {
                $('.quiz-block__item:eq(' + thisSlide + ')').fadeIn("slow");
            });
        });

        $('.js-final').click(function() {

            $(this).parents('.base-section').fadeOut(1e3);
            setTimeout(function() {
                $('.base-section').remove();
                $('.process-section').fadeIn(500);

                $('.process-list__item_first').addClass('active');
                $('.process-circle__chart').addClass('active');

                setTimeout(function() {
                    $('.process-list__item_second').addClass('active');
                }, 1500);

                setTimeout(function() {
                    $('.process-list__item_third').addClass('active');
                }, 3000);

                setTimeout(function() {
                    $('.process-section').fadeOut(1e3);

                    setTimeout(function() {
                        $('.process-section').remove();
                        $('.gift-section').fadeIn(500);
                    }, 1500);
                }, 5000);

                setTimeout(function() {
                    $('.gift-popup').addClass('show');
                }, 6500);
                
            }, 1500);
        });
    }());

    // gift
    (function gift() {

        const jsGift = $('.js-gift');

        const tryPopup = $('.try-popup');

        let tryCount = 2; 

        jsGift.click(function() {

            const thisGift = $(this);

            $(this).addClass('opened');

            setTimeout(function() {
                thisGift.addClass('empty');
            }, 2000);

            jsGift.addClass('disabled');

            tryCount = tryCount - 1;

            if (tryCount !== 0) {
                setTimeout(function() {
                    jsGift.removeClass('disabled');

                    $('.try-count').text(tryCount);

                    tryPopup.addClass('show');
                    tryPopup.find('.popup-content__mark').addClass('draw');

                    setTimeout(function() {
                        $('.popup-content__check').addClass('loaded');
                    }, 1200);

                }, 2000);
            } else {
                $(this).addClass('win');

                setTimeout(function() {

                    $('.win-prod').addClass('active');

                }, 2000);

                setTimeout(function() {

                    $('.js-container').addClass('active');

                    $('.win-popup').addClass('show');

                }, 5000);
            }
        });

        $('.popup-close').click(function() {
            $('.popup').removeClass('show');
            setTimeout(function() {
                $('.popup-content__mark').removeClass('draw');
            }, 500);
        });
    }());

    // accordion
    (function accordion() {
        $('.accordion').click(function () {
            $(this).toggleClass('open').next().slideToggle();
            $('.accordion').not(this).removeClass('open').next().slideUp();
            return false;
        });
    }());

    // question
    (function question() {
        $('.question-btn').click(function() {
            $('.question-popup').addClass('show');
        });

        $('.question-popup__close').click(function() {
            $('.question-popup').removeClass('show');
        });
    }());

    // notify
    (function notify() {

        const dataPerson = [
            {
                name: "Pedro Oliveira",
                address: "Rio de Janeiro"
              },
              {
                name: "Isabela Silva",
                address: "Cidade de São Paulo"
              },
              {
                name: "Rafael Pereira",
                address: "Cidade do Rio de Janeiro"
              },
              {
                name: "Beatriz Costa",
                address: "Cidade de Belo Horizonte"
              },
              {
                name: "Fernando Almeida",
                address: "Cidade de Brasília"
              }
        ];

        let countNotify = 0;

        function startNotify() {

            $('.notify').addClass('show');
            
            const dataName = $('.notify-block__win-name');
            const dataAddress = $('.notify-block__win-address');

            const dataTime = $('.notify-block__time-value');

            const countData = +dataPerson.length - 1;

            // console.log(countData, countNotify);

            dataName.text(dataPerson[countNotify].name);

            dataAddress.text(dataPerson[countNotify].address);

            dataTime.text(Math.floor(Math.random() * 55));

            countNotify = countNotify + 1;

            if (countNotify == dataPerson.length) {
                countNotify = 0;
            }

            setTimeout(function() {
                $('.notify').removeClass('show');
            }, 5000);
        }

        setTimeout(function() {
            startNotify();

            setInterval(function() {
                startNotify();
            }, 30000);
        }, 15000);

        $('.notify-block__close').click(function() {
            $('.notify').removeClass('show');
        });
    }());


});

const Confettiful = function(el) {
    this.el = el;
    this.containerEl = null;
    
    this.confettiFrequency = 3;
    this.confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E','#EFFF1D'];
    this.confettiAnimations = ['slow', 'medium', 'fast'];
    
    this._setupElements();
    this._renderConfetti();
  };
  
  Confettiful.prototype._setupElements = function() {
    const containerEl = document.createElement('div');
    const elPosition = this.el.style.position;
    
    if (elPosition !== 'relative' || elPosition !== 'absolute') {
      this.el.style.position = 'relative';
    }
    
    containerEl.classList.add('confetti-container');
    
    this.el.appendChild(containerEl);
    
    this.containerEl = containerEl;
  };
  
  Confettiful.prototype._renderConfetti = function() {
    this.confettiInterval = setInterval(() => {
      const confettiEl = document.createElement('div');
      const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
      const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
      const confettiLeft = (Math.floor(Math.random() * this.el.offsetWidth)) + 'px';
      const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];
      
      confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;
      
      confettiEl.removeTimeout = setTimeout(function() {
        confettiEl.parentNode.removeChild(confettiEl);
      }, 3000);
      
      this.containerEl.appendChild(confettiEl);
    }, 25);
  };
  
  window.confettiful = new Confettiful(document.querySelector('.js-container'));
  
  
  