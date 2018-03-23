const app = getApp()

Page({
    data: {
        motto: '',
        userInfo: app.globalData.userInfo,
        fontContent: '',
        content: '很高兴认识你,首先提醒你，这是个极度烧脑的游戏！数数图中有多少个箱子，在输入框内输入答案，第一题你有三十秒的时间，后面每关减少一秒，是时候证明自己的能力了！ Go! Go !Go! 先来一题简单的，加油吧^_^！',
        // content: '很高兴认识你',
        passIndex: 1,
        picIndex: 7,
        imgUrl: 'http://zhengcheng.club/demo/images/xcx/pic0/7.png',
        hide: '',
        show: '',
        timer: 30,
        imgList: [7, 8, 12, 14, 15, 17, 18, 20, 23, 24, 27, 28, 30, 33, 34, 40, 42, 43, 44, 54, 58],
        // imgList: [7, 8],
        digitaKeyboard: [
            {
                id: 7,
                name: '7',
                type: 0
            },
            {
                id: 8,
                name: '8',
                type: 0
            },
            {
                id: 9,
                name: '9',
                type: 0
            },
            {
                id: 10,
                name: '退格',
                type: 1
            },
            {
                id: 4,
                name: '4',
                type: 0
            },
            {
                id: 5,
                name: '5',
                type: 0
            },
            {
                id: 6,
                name: '6',
                type: 0
            },
            {
                id: 11,
                name: '清空',
                type: 1
            },
            {
                id: 1,
                name: '1',
                type: 0
            },
            {
                id: 2,
                name: '2',
                type: 0
            },
            {
                id: 3,
                name: '3',
                type: 0
            },
            {
                id: 12,
                name: '确定',
                type: 1
            },
            {
                id: 0,
                name: '0',
                type: 0
            },
            {
                id: 13,
                name: '点盈',
                type: 2
            },
            {
                id: 14,
                name: '名通',
                type: 2
            },
            {
                id: 15,
                name: '金陵百态',
                type: 2
            }
        ],
        answer: 0,
        totalTime: 0,
        resultDialog: 0,
        resultShow: 0,
        good: 'http://zhengcheng.club/demo/images/xcx/goodImg/good1.jpg',
        faile: 'http://zhengcheng.club/demo/images/xcx/faileImg/faile1.jpg',
        t: null,
        startTime: Date.parse(new Date()),
        endTime: Date.parse(new Date()),
        runTime: ''
    },
    //事件处理函数
    playGames: function () {
        wx.navigateTo({
            url: '../games/games',
        })
    },
    onLoad: function () {
        this.completion()
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function (e) { //获取用户信息
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    completion: function () { //文字补全
        var t = 0
        var newContent = ''
        var maxLength = this.data.content.length
        var time = setInterval(() => {
            this.setData({
                fontContent: this.data.content.substring(0, t + 1)
            })
            if (t > this.data.content.length) {
                clearTimeout(time)
                setTimeout(() => {
                    this.setData({
                        hide: 'hide',
                        show: 'show',
                        startTime: Date.parse(new Date())
                    })
                    this.countdown()
                }, 800)
            } else {
                t++
            }
        }, 100)
    },
    countdown: function () { //倒计时
        this.data.timer = 30
        this.data.t = setInterval(() => {
            this.data.timer--
            this.setData({
                timer: this.data.timer
            })
            if (this.data.timer === 0) {
                clearInterval(this.data.t)
                console.log('no')
                this.setData({
                    resultDialog: 1,
                    resultShow: 3,
                    faile: 'http://zhengcheng.club/demo/images/xcx/faileImg/faile' + parseInt(5 * Math.random()) + '.jpg'
                })
            }
        }, 1000)
    },
    chose: function (event) { //数字键盘键入
        if (event.target.id == 10) {
            var length = this.data.answer.length
            if (length - 1) {
                this.data.answer = this.data.answer.substring(0, length - 1)
            } else {
                this.data.answer = 0
            }
        } else if (event.target.id == 11) {
            this.data.answer = 0
        } else if (event.target.id == 12) {
            console.log(this.data.answer)
            if (parseInt(this.data.answer) === this.data.picIndex) {
                console.log('yes')
                clearInterval(this.data.t)
                this.data.passIndex++
                if (this.data.passIndex > this.data.imgList.length) {
                    console.log('通关了！！')
                    this.data.endTime = Date.parse(new Date())
                    var runTime = (parseInt(this.data.endTime) - parseInt(this.data.startTime)) / 1000
                    this.setData({
                        hide: 'hide',
                        show: 'show',
                        resultDialog: 1,
                        resultShow: 1,
                        runTime: runTime + '秒'
                    })
                    console.log(this.data.startTime, this.data.endTime)
                } else {
                    this.data.picIndex = this.data.imgList[this.data.passIndex - 1]
                    this.setData({
                        resultDialog: 1,
                        resultShow: 2
                    })
                    setTimeout(() => {
                        this.countdown()
                        var addTime = 31 - this.data.passIndex
                        this.setData({
                            imgUrl: 'http://zhengcheng.club/demo/images/xcx/pic0/' + this.data.imgList[this.data.passIndex - 1] + '.png',
                            passIndex: this.data.passIndex,
                            answer: 0,
                            resultDialog: 0,
                            resultShow: 0,
                            timer: addTime,
                            good: 'http://zhengcheng.club/demo/images/xcx/goodImg/good' + parseInt(12 * Math.random()) + '.jpg'
                        })
                    }, 1200)
                }
            } else {
                console.log('no')
            }
        } else if (event.target.id == 13) {
            console.log('跳转到点盈官网')
        } else if (event.target.id == 14) {
            console.log('跳转到名通官网')
        } else if (event.target.id == 15) {
            console.log('跳转到金陵百态')
        } else if (this.data.answer === 0) {
            this.data.answer = event.target.id
        } else {
            this.data.answer += event.target.id
        }
        this.setData({
            answer: this.data.answer
        })
    },
    restart: function () {
        wx.redirectTo({
            url: '../index/index',
        })
    }
})