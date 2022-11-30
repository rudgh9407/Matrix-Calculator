class Matrix_calculator{    //====================MATRIX CALCULATOR CLASS 선언====================//
  constructor(){
  }
  box_control(){    //====================MATRIX CALCULATOR 동작 메소드====================//
    class New_inner {    //====================내부박스 클래스====================//
      constructor (row, column){
        this._row = row;
        this._column = column;
        this._data = [];
        this._key = 1;
      }
      get change_inner(){
        return this._data;
      }
      set change_inner([change_row, change_col]){
        this._row = change_row;
        this._column = change_col;
      }
      reg_input(e){    //====================입력창 정규식 메소드====================//
        const input_doc = new RegExp(/[^1-9]/g, '');
        $(e).val( (input_doc.test($(e).val())) ? ('') : ($(e).val()));
        if(1 < $(e).val().length){
          $(e).val('');
        };
        $(e).attr('value', `${$(e).val()}`);
      };
      reg_box(e, count){    //====================내부박스 정규식 메소드====================//
        const reg_doc = new RegExp(/^-?\d*$/gm);
        const reg_doc_sort = new RegExp(/^00|-0/gm,'');
        reg_doc_sort.test($(e).val()) && $(e).val('');
        let sort_reg = reg_doc.test($(e).val());
        if(sort_reg == false){
          $(e).val('');
        } else if(3 < $(e).val().length) {
          let num_reg = Number($(e).val());
          $(e).val(num_reg.toLocaleString('ko-KR'));
        }
        (count < $(e).val().length) && $(e).val('');
      };
      create_inner(box, type, keep_data){    //====================내부박스 생성 메소드====================//
        $(box).empty();
        function css_inner(inner_root, large_box) {
          $(`${box}>${inner_root}`).css({width: `${100 / large_box}%`, height: "100%", fontSize: `${9 / large_box}rem`, boxShadow: `inset ${0.6 / large_box}rem ${0.6 / large_box}rem 0rem #FFEFB6, ${0.6 / large_box}rem ${0.6 / large_box}rem 0rem #5F8CA3`});
        }
        let row_box = Number(this._row) + 1.1;
        let col_box = Number(this._column) + 1.1;
        let i = 0;
        while(i < this._row){
          $(box).append(`<div></div>`);
          (box != '#inner_result' && keep_data[i] == undefined) && keep_data.push([]); // 빈배열 행 추가(결과값 제외)
          if(this._row >= this._column){
            $(`${box}>div`).css("width", `100%`).css("height", `${100 / row_box}%`);
          }else {
            $(`${box}>div`).css("width", `100%`).css("height", `${100 / col_box}%`);
          };
          let j = 0;
          while(j < this._column){
            if(type == "input"){
                $(`${box}>div:nth-child(${i+1})`).append(`<input type="text" name="num_box" placeholder="0">`);
                if(keep_data[i][j] == undefined){
                  $(`${box}>div:nth-child(${i+1})>input:nth-child(${j+1})`)[0].value == '0';
                } else {
                  $(`${box}>div:nth-child(${i+1})>input:nth-child(${j+1})`)[0].value = keep_data[i][j];
                }   // 기존 입력값 확인후 값 유지
                this.reg_box($(`${box}>div:nth-child(${i+1})>input:nth-child(${j+1})`)[0], 5);
            }else {
              $(`${box}>div:nth-child(${i+1})`).append(`<div><input type="text" name="num_box" placeholder="0" readonly></div>`);
            };
            if(this._row >= this._column){
              css_inner(`div>input`, row_box);
              css_inner(`div>div`, row_box);
              $(`${box}>div>div input`).css("font-size", `${9 / row_box}rem`);
            } else {
              css_inner(`div>input`, col_box);
              css_inner(`div>div`, col_box);
              $(`${box}>div>div input`).css("font-size", `${9 / col_box}rem`);
            };
            j++;
          };
          i++;
        };
        $(`${box}>div>input`).each((index, value)=>{   //====================MATRIX A, B 내부박스 정규식====================//
            $(value).keyup(() => {
              this.reg_box(value, 5);
              this._key = 2;
            });
            $(value).blur(() => {
              if($(value).val() == '-'){
                $(value).val('');
              };
              $(value).attr(`placeholder`, "0");
            });
            $(value).focus(() => {
              $(value).attr(`placeholder`, ``);
            });
        });
      }
      random_inner(box, keep_data){    //====================랜덤숫자 적용 메소드====================//
        $(`${box}`)[0].reset();
        let i = 0;
        while(i < this._row){
          (keep_data[i] == undefined) && keep_data.push([]);  // 빈배열 행 추가(결과값 제외)
          let j = 0;
          while(j < this._column){
            let random_val = Math.floor((Math.random()*(9999+999+1))-999);
            if($(`${box}>div:nth-child(${i+1})>input:nth-child(${j+1})`).val() == `${keep_data[i][j]}` || keep_data[i][j] == undefined){
              $(`${box}>div:nth-child(${i+1})>input:nth-child(${j+1})`).attr('value', random_val);
            } else {
              $(`${box}>div:nth-child(${i+1})>input:nth-child(${j+1})`).attr('value', keep_data[i][j]);   // 기존값 적용
            }
            let get_random = $(`${box}>div:nth-child(${i+1})>input:nth-child(${j+1})`)[0];
            this.reg_box(get_random, 5);
            j++;
          }
          i++;
        }
      }
      data_push(box){    //====================A, B DATA get 메소드====================//
        this._data = [];
        let i = 0;
        while(i < this._row){
          let key_arr = [];
          let j = 0;
          while(j < this._column){
            let key_data = $(`${box}>div:nth-child(${i+1})>input:nth-child(${j+1})`).val();
            let str_comma = new RegExp(/,/gm,'');
            let to_num = key_data.replace(str_comma,'');
            key_arr.push(to_num);
            j++;
          }
          this._data.push(key_arr);
          i++;
        }
      };
      data_calculation(box, set_calculater, data_arr_a, data_arr_b){    //====================행렬연산 메소드====================//
        this._data = [];
        let max_length = 0;
        max_length = ($(`#inner_first>div`).length > $(`#inner_second>div:first-child>input`).length) ? (
          $(`#inner_first>div`).length
        ) : (
          $(`#inner_second>div:first-child>input`).length
        ); 
        $(`#detail_box>p`).remove();
        let i = 0;
          while(i < $(`#inner_first>div`).length){
            let j = 0;
            while(j < $(`#inner_second>div:first-child>input`).length){
              if( set_calculater == 'plus' ){
                $(`${box}>div:nth-child(${i+1})>div:nth-child(${j+1})>input`).attr('value', `${Number(data_arr_a[i][j]) + Number(data_arr_b[i][j])}`);
              } else if( set_calculater == 'minus' ) {
                $(`${box}>div:nth-child(${i+1})>div:nth-child(${j+1})>input`).attr('value', `${Number(data_arr_a[i][j]) - Number(data_arr_b[i][j])}`);
              } else if (set_calculater == 'multiply') {
                let k = 0;
                let math_multiply = 0;
                while(k < $(`#inner_second>div`).length){
                  math_multiply += ( Number(data_arr_a[i][k]) * Number(data_arr_b[k][j]) );
                  k++;
                }
                $(`${box}>div:nth-child(${i+1})>div:nth-child(${j+1})>input`).attr('value', `${math_multiply}`);
              }
              let get_result = $(`${box}>div:nth-child(${i+1})>div:nth-child(${j+1})>input`)[0];
              this.reg_box(get_result, 99);   //====================result 내부박스 정규식====================//
              //====================결과값 자세히 보기====================//
              $(`#detail_box`).append(`<p>${get_result.value}</p>`);          
              $(`#detail_box>p`).css({width: `${100 / $(`#inner_second>div:first-child>input`).length}%`, height: `${100 / $(`#inner_first>div`).length}%`, fontSize: `${14 / max_length}rem`, lineHeight: `${50 / $(`#inner_first>div`).length}rem`});
              j++;
            }
          i++;
        }
      }
      input_effect(){    //====================EVENT 메소드====================//
        let name_effect = (text_obj) => {
          $(`${text_obj}`).css({color: '#FFEFB6', textShadow: '0.5rem 0.5rem 0.5rem #5F8CA3', transform: 'scale(1.8)'});
          setTimeout(function(){
            $(`${text_obj}`).css({color: '#5F8CA3', textShadow: '0 0 0 #FFF', transform: 'scale(1)'});
          }, 300);
        }
        $('#first_number_row, #first_number_col, #second_number_row, #second_number_col').on('keyup', (event) => {
          if(event.target == $(`#first_number_row`)[0] || event.target == $(`#first_number_col`)[0]){
            name_effect(`.first_name`);
            this.reg_input(event.target);
          } else {
            name_effect(`.second_name`);
            this.reg_input(event.target);
          }
        });
        let increse_number = (target, title) => { 
          $(target)[0].value = Number($(target)[0].value) + 1;
          (9 < Number($(target)[0].value)) && $(target).val('1')
          this.reg_input($(target)[0]);
          name_effect(title);
        }
        let decrease_number = (target, title) => {
          $(target)[0].value = Number($(target)[0].value) - 1;
          (Number($(target)[0].value) < 1) && $(target).val('9')
          this.reg_input($(target)[0]);
          name_effect(title);
        }
        $($(`#spinner_first>i`)[0]).on('click', (event) => {
          increse_number(`#first_number_row`, '.first_name');
        });
        $($(`#spinner_first>i`)[1]).on('click', (event) => {
          decrease_number(`#first_number_row`, '.first_name');
        });
        $($(`#spinner_first>i`)[2]).on('click', (event) => {
          increse_number(`#first_number_col`, '.first_name');
        });          
        $($(`#spinner_first>i`)[3]).on('click', (event) => {
          decrease_number(`#first_number_col`, '.first_name');
        });           
        $($(`#spinner_second>i`)[0]).on('click', (event) => {
          increse_number(`#second_number_row`, '.second_name');
        });
        $($(`#spinner_second>i`)[1]).on('click', (event) => {
          decrease_number(`#second_number_row`, '.second_name');
        });
        $($(`#spinner_second>i`)[2]).on('click', (event) => {
          increse_number(`#second_number_col`, '.second_name');
        });          
        $($(`#spinner_second>i`)[3]).on('click', (event) => {
          decrease_number(`#second_number_col`, '.second_name');
        });
        //====================결과값 자세히 보기====================//
        let show_flag = 1;
        $(`#detail_result`).on('click', () => {
          if(show_flag){
            $(`#detail_box`).css({width: '114rem', height: '50rem', visibility: 'visible'});
            $(`html, body`).css({height: '115rem', overflowY: 'visible', overflowX: 'hidden'});
            $(`body, html`).animate({scrollTop: $(document).height()}, 1000);
            $(`.close_detail`).css('visibility', 'visible');
            show_flag = 0;
          } else {
            $(`#detail_box`).css({width: '114rem', height: '0rem', visibility: 'hidden'});
            $(`html, body`).css({height: '61rem', overflowY: 'hidden', overflowX: 'hidden'});
            $(`body, html`).animate({scrollTop: 0}, 1000);
            $(`.close_detail`).css('visibility', 'hidden');
            show_flag = 1;
          }
        });
        $(`body>i`).on('click', () => {
            $(`#detail_box`).css({width: '114rem', height: '0rem', visibility: 'hidden'});
            $(`html, body`).css({height: '61rem', overflowY: 'hidden', overflowX: 'hidden'});
            $(`body, html`).animate({scrollTop: 0}, 1000);
            $(`.close_detail`).css('visibility', 'hidden');
            show_flag = 1;
        });
        //====================배경 눈내리는 효과====================//
        let snow_key = 0;
        let snow_action = () => {
          let snow_size = (Math.random()*(5-1+1)+1).toFixed(3);
          let to_position = Math.floor(Math.random()*(120+20+1)-20);
          let from_position = Math.floor(Math.random()*(120+20+1)-20);
          let snow_opacity = Math.floor(Math.random()*(60-40+1)+40);
          let snow_duration =  Math.floor(Math.random()*(30000-10000+1)+10000);
          let snow_effect = [
            {top: "-20%", left: `${to_position}%`, color: '#FFEFB6', opacity: `${snow_opacity}%`, fontSize: `${snow_size}rem`},
            {opacity: '40%'},
            {top: `calc(115rem - ${snow_size}rem)`, left: `${from_position}%`, color: '#FFB6B8', opacity: `0%`, fontSize: `${snow_size}rem`}
          ];
          let snow_timing = {
            duration: snow_duration,
            iterations: 1
          }
          $(`body`).append(`<i class="snow_${snow_key} xi-snow-crystal"></i>`);
          let snow_target = $(`.snow_${snow_key}`);
          snow_target[0].animate(snow_effect, snow_timing);
          snow_key++;
          let snow_delete = () => {
            snow_target.remove();
          }
          setTimeout(snow_delete, snow_duration);
          setTimeout(snow_action, snow_duration);
        };
        let i = 0;
        while(i < Math.floor(Math.random()*(70-30+1)+30)){
          let snow_roof_time = Math.floor(Math.random()*(30000+1));
          setTimeout(snow_action, snow_roof_time);
          i++;
        }
      }
      click_effect(element){     //====================Click EVENT 메소드====================//
        class Css_animation{    //====================CSS 효과 Class 선언====================//
          constructor(first_percent = -30, second_percent = -200, roof_time = 10000){
            this.first_percent = first_percent;
            this.second_percent = second_percent;
            this.roof_time = roof_time;
          }
          get css_value(){
            return this.result_timing;
          }
          set css_value([set_percent_1, set_percent_2, set_time]){
            this.first_percent = set_percent_1;
            this.second_percent = set_percent_2;
            this.roof_time = set_time;
          }
          css_input(line){
            $(`main>section>${line}`).css('transform', 'scale(1.3)');
            setTimeout(function(){
              $(`main>section>${line}`).css('transform', 'scale(1)');
            }, 200);
          };
          css_error(){
            const keyframes_error = [
              {transform: 'rotate(5deg)', borderColor: '#C44C51', borderWidth: '0.6rem'},
              {transform: 'rotate(-5deg)', borderColor: "#C44C51", borderWidth: '0.6rem'}
            ];
            const error_timing = {
              duration: 50,
              iterations: 5
            };
            $(`main>section>div`).each((index, value)=>{
              value.animate(keyframes_error, error_timing);
            });
          };
          zoom_result(){
            let keyframes_result = [
              { left : `${this.first_percent}%`, width: 'auto' },
              { left : `${this.second_percent}%`, width: 'auto' },
              { left : `${this.first_percent}%`, width: 'auto' }
            ];
            let result_timing = {
              duration: this.roof_time,
              iterations: Infinity
            };
            $(`#inner_result>div>div>input`).each(function(k, v){
              if(v.value.length > 6){
                v.animate(keyframes_result, result_timing);
                $(v).on('mouseenter', function(){
                  $(v).parent().parent().parent().css('overflow', 'visible').css('z-index', '8000');
                  $(v).parent().css('overflow', 'visible').css('z-index', '9000');
                  $(v).css({transform: 'scale(2.5)', textShadow: '0.1rem 0 #C44C51, 0 0.1rem #C44C51, -0.1rem 0 #C44C51, 0 -0.1rem #C44C51, 0 0 0.5rem black', color: '#FFB6B8'});
                });
                $(v).on('mouseleave', function(){
                  $(v).parent().parent().parent().css('overflow', 'hidden').css('z-index', '100');
                  $(v).parent().css('overflow', 'hidden').css('z-index', '1000');
                  $(v).css({transform: 'scale(1)', textShadow: '', color: 'black'});
                });
              }
            });
          }
          button_effect(){
            $(`#btn_plus, #btn_minus, #btn_multiply, #btn_reset`).on('mouseenter',function(){
              if(this == $(`#btn_reset`)[0]){
                $(this).css({ width: '13rem', height: '5rem', fontSize: '2.5rem' });
              } else {
                $(this).css({ width: '8rem', height: '5rem' });
              }
            });
            $(`#btn_plus, #btn_minus, #btn_multiply, #btn_reset`).on('mouseleave',function(){
              if(this == $(`#btn_reset`)[0]){
                $(this).css({ width: '10rem', height: '3rem', fontSize: '1.4rem' });
              } else {
                $(this).css({ width: '5rem', height: '5rem' });
              }
            });
          }
        }
        let Css_module = new Css_animation();   //====================CSS Class Obj 생성====================//
        let output_count = 0;
        let out_coune_row, out_count_col;
        if(element != 'result') {
          $(`#${element}_output, #${element}_random`).on("click", (event) => {
            if($(`#inner_${element}>div`).length == 0){   // 셀 초기화시 data_push 값 초기화
              this.change_inner = []; 
              this._key = 2;
            }
            let switch_element;     //====================출력, 랜덤 버튼 클릭시 기존 입력값 유지====================//
            if(element == 'first'){
              Matrix_a.data_push('#inner_first');
              switch_element = Matrix_a.change_inner;
            } else if(element == 'second'){
              Matrix_b.data_push('#inner_second');
              switch_element = Matrix_b.change_inner;
            }
            this.change_inner = [$(`#${element}_number_row`).val(), $(`#${element}_number_col`).val()];
            this.create_inner(`#inner_${element}`, 'input', switch_element);
            if(event.target == $(`#${element}_random`)[0]){
              if(this._key != 1 && (this._key % 2) == 1){
                this.random_inner(`#inner_${element}`, []);
              } else {
                this.random_inner(`#inner_${element}`, switch_element);
                this._key++;
              }
            } else if (this._key > 1) {
              this._key = 2;
            if(output_count == 0){
              out_coune_row = $(`#${element}_number_row`).val();
              out_count_col = $(`#${element}_number_col`).val();
              output_count = 1;
            } else if(output_count == 1) {
              if(out_coune_row == $(`#${element}_number_row`).val() && out_count_col == $(`#${element}_number_col`).val() ){
                $(`#inner_${element}>div>input`).each((index, value) => {
                  $(value).val('')
                });
              }
              output_count = 0;
            }
            };
            $(`#spinner_first>i, #spinner_second>i`).each((index, value) => {
              $(value).on('click', () => {
                this._key = 2;
              });
            });
            Css_module.css_input(`.line_${element}`);
          });
        } else {
          $(`#btn_plus, #btn_minus, #btn_multiply, #btn_reset`).on(`click`, (event) => {
            let condition_plus = $('#inner_first>div').length == $('#inner_second>div').length && $('#inner_first>div:first-child>input').length == $('#inner_second>div:first-child>input').length;
            let condition_minus = $('#inner_first>div').length == $('#inner_second>div').length && 
              $('#inner_first>div:first-child>input').length == $('#inner_second>div:first-child>input').length;
            let condition_multiply = $('#inner_first>div:first-child>input').length == $('#inner_second>div').length;
            let result_btn = (cal_condition , calculation, setting, result_row_col) => {
              if(cal_condition){
                Matrix_a.data_push('#inner_first');
                Matrix_b.data_push('#inner_second');
                this.change_inner = result_row_col;
                this.create_inner('#inner_result','result');
                this.data_calculation(calculation, setting, Matrix_a.change_inner, Matrix_b.change_inner);
                Css_module.css_input(`.line_result`);
              } else {
                $('#inner_result').empty();
                Css_module.css_error();
              }
            };
            switch(true){
              case (event.target == $(`#btn_plus`)[0] || event.target == $(`#btn_plus>i`)[0]):
                result_btn(condition_plus, `#inner_result`, 'plus', [$(`#inner_first>div`).length, $(`#inner_first>div:first-child>input`).length]);
              break;
              case (event.target == $(`#btn_minus`)[0] || event.target == $(`#btn_minus>i`)[0]):
                result_btn(condition_minus, `#inner_result`, 'minus', [$(`#inner_first>div`).length, $(`#inner_first>div:first-child>input`).length]);
              break;
              case (event.target == $(`#btn_multiply`)[0] || event.target == $(`#btn_multiply>i`)[0]):
                result_btn(condition_multiply, `#inner_result`, 'multiply', [$(`#inner_first>div`).length, $(`#inner_second>div:first-child>input`).length]);
                Css_module.css_value = [-30, -200, 10000];
                Css_module.zoom_result();
              break;
              case (event.target == $(`#btn_reset`)[0]):
                $('#inner_first, #inner_second, #inner_result').empty();
                $(`#detail_box`).find('p').empty();
                $(`header>.control_part input`).each((index, value) => {
                  $(value).val('');
                });
                $(`#detail_box`).css({width: '114rem', height: '0rem', visibility: 'hidden'});
                $(`html, body`).css({height: '61rem', overflowY: 'hidden', overflowX: 'hidden'});
                $(`body, html`).animate({scrollTop: 0}, 1000);
                $(`.close_detail`).css('visibility', 'hidden');
                Css_module.css_error();
              break;
            }
          });
        }
        Css_module.button_effect();
      }
    }
    let Matrix_reg = new New_inner();   //====================정규식 확인 CLASS 생성====================//
    let Matrix_a = new New_inner();   //====================MATRIX A CLASS 생성====================//
    let Matrix_b = new New_inner();   //====================MATRIX B CLASS 생성====================//
    let Matrix_result = new New_inner();   //====================MATRIX RESULT CLASS 생성====================//
    Matrix_a.click_effect('first');   //====================MATRIX A CLICK EVENT 메소드 실행====================//
    Matrix_b.click_effect('second');   //====================MATRIX B CLICK EVENT 메소드 실행====================//
    Matrix_result.click_effect('result');   //====================MATRIX RSULT CLICK EVENT 메소드 실행====================//
    Matrix_reg.input_effect();   //====================정규식 확인 메소드 실행====================//
  }
}

let Matrix_call = new Matrix_calculator();   //====================MATRIX CALCULATOR CLASS 생성===================//
Matrix_call.box_control();   //====================MATRIX CALCULATOR 동작 메소드 실행===================//