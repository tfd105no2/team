Vue.component('double-check-off', {
    template:
        ` 
        <div class="dbc">
            <section></section>
            <p>日期:2022/03/22</p>
            <p>區域:海底隧道</p>
            <p>確定要關閉該區嗎?</p>

            <div>
                <button type="button" @click='cancel'>取消</button>
                <button type="button" @click='sure'>確認</button>
            </div>
        </div>                
        `
    ,
    methods: {
        sure() {
            this.$emit('save')

        },
        cancel() {
            this.$emit('cancel')
        }
    },
});
Vue.component('double-check-on', {
    template:
        ` 
        <div class="dbc">
            <section></section>
            <p>日期:2022/03/22</p>
            <p>區域:海底隧道</p>
            <p>確定要開啟該區嗎?</p>

            <div>
                <button type="button" @click='cancel'>取消</button>
                <button type="button" @click='sure'>確認</button>
            </div>
        </div>                
        `
    ,
    methods: {
        sure() {
            this.$emit('save')
        },
        cancel() {
            this.$emit('cancel')
        }
    },
});
new Vue({
    el: '#root',
    data: {
        dbcheck_off: false,
        dbcheck_on: false,
        mainbtn: [
            { name: "會員管理", url: "b_member.html" },
            { name: "訂單管理", url: "b_order.html" },
            { name: "消息管理", url: "b_news.html" },
            { name: "房間管理", url: "b_area.html" },
            { name: "訂票管理", url: "b_ticket.html" },

        ],

        today: {
            year: 0,
            month: 0,
            date: 0,
            day: 0
        },
        calendar: {
            year: 0,
            month: 0,
            date: 0,
            day: 0
        },

        current_edit: null,
    },
    created: function () {
        this.showMdata(1);
    },
    mounted() {
        this.setToday()
    },
    methods: {
        edit(index) {
            // this.current_edit = index;
            this.current_edit = 'aa';
        },


        f_close() {
            this.dbcheck_off = true;
            // this.current_edit = null;
            let edit_z = document.querySelector('.b_area_edit');
            edit_z.style.opacity = 0;
        },
        f_open() {
            this.dbcheck_on = true;
            // this.current_edit = null;
            let edit_z = document.querySelector('.b_area_edit');
            edit_z.style.opacity = 0;
        },
        f_out() {

            this.current_edit = null;
            let edit_z = document.querySelector('.b_area_edit');
            edit_z.style.opacity = 0;
        },

        sss() {
            this.current_edit = null;
            this.dbcheck = false;
            let edit_z = document.querySelector('.b_area_edit');
            edit_z.style.opacity = 1;

        },

        ccc() {
            // this.current_edit = null;
            this.dbcheck = false;
            let edit_z = document.querySelector('.b_area_edit');
            edit_z.style.opacity = 1;
        },


        f_save() {

            let n_index = this.$data.current_edit;

            this.current_edit = null;

            // $.ajax({
            //     method: "POST",
            //     url: "../php/n-member_update.php",
            //     data: {
            //         account: this.members[n_index].account, // 哪筆會員
            //         member_status: this.members[n_index].member_status, // 更新的會員狀態
            //     },
            //     dataType: "text",
            //     success: function (response) {
            //         alert("更新成功");
            //     },
            //     error: function (exception) {
            //         alert("發生錯誤: " + exception.status);
            //     }
            // });

        },
        log_out() {
            localStorage.setItem("n-login", "no");
            location.href = "./n-login.html"
        },

        showMdata(gopage) {
            console.log(gopage);
            if (isNaN(gopage)) return;
            this.nowpage = gopage;

            // $.ajax({
            //     method: "POST",
            //     url: "../php/getMemberData.php",
            //     data: {
            //         page: gopage,
            //     },
            //     dataType: "json",
            //     success: function (response) {
            //         appVue.pages = response[0];
            //         appVue.members = response[1];
            //     },
            //     error: function (exception) {
            //         alert("發生錯誤: " + exception.status);
            //     },
            // });
        },
        setToday() {
            const date = new Date()
            this.today.year = this.calendar.year = date.getFullYear()
            this.today.month = this.calendar.month = date.getMonth() // 0~11
            this.today.date = this.calendar.date = date.getDate()
            this.today.day = this.calendar.day = date.getDay()
        },
        adjustYear(fix) {
            this.calendar.year += fix
        },
        adjustMonth(fix) {
            // this.calendar.month += fix 範圍
            let month = this.calendar.month + fix
            if (month > 11) {
                this.adjustYear(1)
                this.calendar.month = 0
            } else if (month < 0) {
                this.adjustYear(-1)
                this.calendar.month = 11
            } else {
                this.calendar.month = month
            }

        }

    },
    computed: {
        // monthFirstDay(){
        //   const date = new Date(this.calendar.year,this.calendar.month,1)
        //   return {
        //     year:date.getFullYear(),// this.calendar.year
        //     month:date.getMonth(),// this.calendar.month
        //     date:date.getDate(),// 1
        //     day:date.getDay(),
        //   }
        // },
        calendarFirstDay() {
            const mDate = new Date(this.calendar.year, this.calendar.month, 1)
            const date = new Date(this.calendar.year, this.calendar.month, 1 - mDate.getDay())
            return {
                year: date.getFullYear(),
                month: date.getMonth(),
                date: date.getDate(),
                day: date.getDay(),
            }
        },
        calendarMonth() {
            const data = []
            let date
            for (let i = 0; i < 42; i++) {
                date = new Date(this.calendarFirstDay.year, this.calendarFirstDay.month, this.calendarFirstDay.date + i)
                data.push({
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    date: date.getDate(),
                    day: date.getDay()
                })
            }
            return data
        }

    }
}
);

