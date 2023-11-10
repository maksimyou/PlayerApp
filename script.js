
class App {
    autors = [
        {
            name: 'James Brown and The Famous Flames- I Got You',
            img: './assets/img/1.jpg',
            sound: './assets/music/1-I Got  You.mp3'
        },
        {
            name: 'The Animals - Don\'t Let Me Be Misunderstood',
            img: './assets/img/2.jpg',
            sound: './assets/music/2-Don Let Me Be Misunderstood.mp3'
        },
        {
            name: 'Sting-Russians',
            img: './assets/img/3.jpg',
            sound: './assets/music/3-russians.mp3'
        },
        {
            name: 'Scorpions-Holiday',
            img: './assets/img/4.jpg',
            sound: './assets/music/4-Holiday.mp3'
        }
    ]



    pause = './assets/img/pause.png'
    play = './assets/img/play.png'
    prev = './assets/img/prev.png'
    next = './assets/img/next.png'
    currentSound = 0;
    isPlayed = true
    rsSchoolImg = 'https://rs.school/images/rs_school_js.svg'
    logoSrc = './assets/img/logo.svg'
    reSchoolLink = 'https://rs.school/js-stage0/'
    soundd = new Audio();
    header = this.createElement('header', 'div')
    headerContainer = this.createElement('header-container', 'div')
    main = this.createElement('main', 'div')
    mainContainer = this.createElement('main-container', 'div')
    mainBlur = this.createElement('main-blur', 'div')

    footer = this.createElement('footer', 'div')
    footerContainer = this.createElement('footer-container', 'div')
    logo = this.createElement('logo', 'img')
    title = this.createElement('title', 'div')
    playerPanel = this.createElement('player-panel', 'div')
    soundImage = this.createElement('sound-image', 'div')
    soundTrackText = this.createElement('sound-track-text', 'div')

    timerAllCurent = this.createElement('timer-all-curent', 'div')
    timerAll = this.createElement('timer-all', 'div')
    timerCurent = this.createElement('timer-curent', 'div')
    scrollTimer = this.createElement('scroll-timer', 'input')
    valuePanel = this.createElement('value-panel', 'div')
    valueIcon = this.createElement('value-icon', 'img')
    scrollValue = this.createElement('scroll-value', 'input')

    panelNavigation = this.createElement('panel-navigation', 'div')
    navPrev = this.createElement('navigation-prev', 'div')
    navPlayPause = this.createElement('navigation-play-pause', 'div')
    navNext = this.createElement('navigation-next', 'div')
    github = this.createElement('github', 'div', `© ${new Date().getFullYear()} github`)
    githubImg = this.createElement('githubImg', 'img')


    constructor(app) {
        this.app = app
    }
    generMinutesSecund(num) {
        let min = Math.floor(+num / 60);
        let sec = 0;
        if (Math.floor(+num) % 60 >= 10) {
            sec = Math.floor(+num) % 60
        } else {
            sec = '0' + Math.floor(+num) % 60
        }

        return `${min}:${sec}`
    }

    scrollTimeFunc2(dur, val) {
        const percent = dur / 100;
        console.log(val)
        this.soundd.currentTime = val * percent
    }

    scrollTimeFunc(dur, cur) {
        const percent = dur / 100;
        this.scrollTimer.value = Math.floor(cur / percent)
    }



    generateHtml() {
        this.soundd.src = this.autors[0].sound
        this.scrollTimer.value = 0
        this.soundd.addEventListener('timeupdate', () => {
            this.scrollTimeFunc(this.soundd.duration, this.soundd.currentTime)
            this.timerCurent.textContent = this.generMinutesSecund(this.soundd.currentTime)
            if (this.soundd.currentTime === this.soundd.duration) this.prevNextSound('next')
        })
        this.title.textContent = 'Мини плеер'
        this.soundTrackText.textContent = this.autors[0].name
        this.timerCurent.textContent = '0:00'
        setTimeout(() => {
            this.timerAll.textContent = this.generMinutesSecund(this.soundd.duration);
        }, 100);
        this.scrollValue.type = 'range'
        this.scrollValue.addEventListener('input', (e) => {
            this.soundd.volume = (e.target.value * 0.01)
        })
        this.valueIcon.src = './assets/img/volume-1.png'
        this.valuePanel.append(this.valueIcon, this.scrollValue)
        this.scrollTimer.type = 'range'
        this.logo.src = this.logoSrc;
        this.soundImage.style.backgroundImage = `url(${this.autors[0].img})`
        this.playerPanel.append(this.soundImage)
        this.playerPanel.append(this.soundTrackText)
        this.timerAllCurent.append(this.timerCurent, this.timerAll)
        this.playerPanel.append(this.timerAllCurent)
        this.scrollTimer.addEventListener('input', (e) => {
            this.scrollTimeFunc2(this.soundd.duration, e.target.value)
            console.log(this.soundd.currentTime)

        })
        this.playerPanel.append(this.scrollTimer)
        this.playerPanel.append(this.valuePanel)

        this.navPlayPause.addEventListener('click', () => {
            this.audioSwitch()
        })

        this.navPrev.addEventListener('click', () => {
            this.prevNextSound('prev')
        })

        this.navNext.addEventListener('click', () => {
            this.prevNextSound('next')
        })

        this.panelNavigation.append(this.navPrev, this.navPlayPause, this.navNext)
        this.playerPanel.append(this.panelNavigation)
        this.headerContainer.append(this.logo)
        this.headerContainer.append(this.title)
        this.header.append(this.headerContainer)
        this.mainContainer.append(this.mainBlur)
        this.mainContainer.append(this.playerPanel)
        this.main.append(this.mainContainer)
        this.footerContainer.append(this.github)
        this.githubImg.src = this.rsSchoolImg
        this.footerContainer.append(this.githubImg)
        this.footer.append(this.footerContainer)
        this.app.append(this.header, this.main, this.footer)
    }


    createElement(classs, tag, text = '') {
        const elem = document.createElement(tag);
        elem.classList.add(classs)
        elem.textContent = text;
        return elem;
    }


    audioSwitch() {
        if (this.isPlayed) {
            console.log(this.isPlayed)
            this.soundd.play()
            this.navPlayPause.style.backgroundImage = `url(${this.pause})`
            this.isPlayed = !this.isPlayed
        } else {
            console.log(this.isPlayed)
            this.soundd.pause()
            this.navPlayPause.style.backgroundImage = `url(${this.play})`
            this.isPlayed = !this.isPlayed

        }
    }


    audioAddSounds(str) {
        console.log(this.isPlayed)
        this.soundd.src = str;
        if (this.isPlayed) {
            this.soundd.pause()
        } else {
            this.soundd.play()
        }
    }


    prevNextSound(str) {
        if (str === 'next') {
            this.currentSound++;
            if (this.currentSound >= this.autors.length) this.currentSound = 0;
        }
        if (str === 'prev') {
            this.currentSound--;
            if (this.currentSound === 0) this.currentSound = (this.autors.length - 1);
        }
        this.soundImage.style.backgroundImage = `url(${this.autors[this.currentSound].img})`
        this.mainContainer.style.backgroundImage = `url(${this.autors[this.currentSound].img})`
        this.audioAddSounds(this.autors[this.currentSound].sound)

        setTimeout(() => {
            this.timerAll.textContent = this.generMinutesSecund(this.soundd.duration);
            this.scrollTimer.value = 0
        }, 100);
    }

}


const sound = new App(document.querySelector('.app'))

sound.generateHtml();
