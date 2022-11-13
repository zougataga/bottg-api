class Player {
    constructor(id, source) {
        this.stream = {
            info: {
                name: "Blender Foundation"
            },
            type: "film"
        }
        this.id = id;
        this.source = source;
        this.style = `
      body {
          background: black;
          font-family: 'Rubik', sans-serif;
      }

      .${this.id}-container {
        margin: 5px;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
      }

      .${this.id}-container video {
          width: 100%;
          height: 100%;

          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 30px;
      }

      .${this.id}-container .controls-container {
          position: fixed;
          bottom: 0px;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
          transition: opacity 0.5s linear;
      }

      .${this.id}-container .progress-controls {
        margin: 0px 15px 0px 15px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
      }

      .${this.id}-container .progress-controls .time-remaining {
          text-shadow: black 0.1em 0.1em 0.2em;
          width: 2vw;
          margin: 0 1vw 0 1vw;
      }

     

      .${this.id}-container .progress-controls .progress-bar {

          width: 93.5vw;
          height: 8px;
          max-height: 4px;
          background: #808080;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          cursor: pointer;
      }

     

      .${this.id}-container .progress-controls .progress-bar .buffered {
          width: 0;
          background: #fff;
          height: 4px;
      }

      .${this.id}-container .progress-controls .progress-bar .watched-bar,
      .${this.id}-container .progress-controls .progress-bar .playhead {
          display: inline-block;
          background: red;
      }

     



      .${this.id}-container .progress-controls .progress-bar .watched-bar {
          height: 110%;
          width: 20%;
      }

      .${this.id}-container .progress-controls .progress-bar .playhead {
          height: 3vw;
          width: 3vw;
          max-height: 15px;
          max-width: 15px;
          border-radius: 50%;
          transform: translateX(-50%);
          transition: all 0.2s;
      }
      .${this.id}-container .progress-controls .progress-bar .playhead:hover {
          max-height: 20px;
          max-width: 20px;
      }

   
      .${this.id}-container .progress-controls .progress-bar .mouse-display {
        postion; relative;
        display: none;
        height: 8px;
        width: 3px;
        background-color: #ccc;
          }
       

      .${this.id}-container .progress-controls .progress-bar .mouse-display .timeline_preview {
        bottom: 120px;
color: #ffffff;
font-size: 13px;
line-height: 18px;
font-family: -apple-system, BlinkMacSystemFont, 'segoe ui', roboto, oxygen-sans, ubuntu, cantarell, 'helvetica neue', 'arial', sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';
font-weight: normal;
text-align: start;
padding: 13px 21px 13px 21px;
background-color: #141414;
border-radius: 1px;
    }
      

      .${this.id}-container .controls {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
      }

      .${this.id}-container .controls button {
          background: none;
          outline: none;
          box-shadow: none;
          border: none;
          width: 5vw;
          height: 5vw;
          min-width: 50px;
          min-height: 50px;
          margin: 0px 0.5vw;
          opacity: 1;
          transform: scale(0.7);
          transition: all 0.2s ease-in-out;
          cursor: pointer;
      }

      .${this.id}-container .controls button:hover {
          transform: scale(1);
      }

      .${this.id}-container .controls button svg {
          fill: white;
          stroke: none;
      }

      .${this.id}-container .controls button.volume svg path,
      .${this.id}-container .controls button.help svg,
      .${this.id}-container .controls button.time-rate svg,
      .${this.id}-container .controls button.full-screen svg,
      .${this.id}-container .controls button.volume svg path,
      .${this.id}-container .controls button.cast svg {
          fill: #fff;
      }

      .${this.id}-container .controls button.volume .muted,
      .${this.id}-container .controls button.volume .muted2,
      .${this.id}-container .controls button.volume .full2-volume,
      .${this.id}-container .controls button.volume .full-volume {
display: none;
      }

      .${this.id}-container .controls button.time-rate .rate {
          position: absolute;
          bottom: 95%;
          left: 1%;
          display: none;

          background: #24272E;
          
          position: absolute;

          border-radius: 2px;
          color: #ffffff;
            font-size: 13px;
            font-family: -apple-system, BlinkMacSystemFont, 'segoe ui', roboto, oxygen-sans, ubuntu, cantarell, 'helvetica neue', 'arial', sans-serif, 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol';
             font-weight: normal;
              white-space: nowrap;
  text-align: start;
  width: max-content;
  padding: 0.5em;
      }

      .${this.id}-container .controls button.time-rate .rate .item {
          padding: 9px 25px 9px 25px;
          line-height: 15px;
          text-align: center;
      }

      
      .${this.id}-container .controls button.time-rate .rate .item:hover,
      .${this.id}-container .controls button.time-rate .rate .timerate-active {
          background-color: red;
      }

      .${this.id}-container .controls button.volume .slide {
          position: absolute;
          bottom: 95%;
          left: 15%;
          display: none;

          background: #24272E;
          
          position: absolute;

          border-radius: 2px;
          color: #ffffff;


          width: 25px;
          height: 156px;
          padding: 15px;
      }

      .${this.id}-container .controls button.volume .slide .slider {
          writing-mode: bt-lr;
          appearance: slider-vertical;

          accent-color: red;

          height: 90%;
          width: 100%;
      }

      .${this.id}-container .controls button.volume .slide .countslider {
          height: 10%;
          text-align: center;
          font-weight: bold;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
      }
      .${this.id}-container .controls button.volume .slide .countslider::after {
          content: "%";
      }

      .${this.id}-container .controls .title {
          font-size: 1.5vw;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
      }

      @media only screen and (max-width: 568px) {
          .${this.id}-container .controls .title {
              font-size: 0.5vw;

          }

        

      }

      .${this.id}-container .controls .title .series {
          color: #FEFEFE;
          text-shadow: black 0.1em 0.1em 0.2em;
          font-weight: bold;
          font-size: 1em;
      }

      .${this.id}-container .controls .title .episode {
          color: #A1A1A1;
          text-shadow: black 0.1em 0.1em 0.2em;
          font-size: 0.75em;
          padding-left: 1vw;
      }

      .${this.id}-loading {
          position: fixed;
          z-index: 1;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 30px;
          transition: all 0.3s ease;
      }

      .${this.id}-loading #circle {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          height: 60px;
          width: 60px;
          margin: -25px 0 0 -25px;
          border: 4px rgba(0, 0, 0, 0.25) solid;
          border-top: 4px red solid;
          border-radius: 50%;
          -webkit-animation: spin2 1s infinite linear;
          animation: spin2 1s infinite linear;
      }

      @-webkit-keyframes spin2 {
          from {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
          }

          to {
              -webkit-transform: rotate(359deg);
              transform: rotate(359deg);
          }
      }

      @keyframes spin2 {
          from {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
          }

          to {
              -webkit-transform: rotate(359deg);
              transform: rotate(359deg);
              -webkit-transform: rotate(359deg);
              transform: rotate(359deg);
          }
      }

      #${this.id}-overlay {
          position: fixed;
          display: none;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 2;
          cursor: none;
          transition: opacity 1s;
      }

      #text {
          position: absolute;
          top: 35%;
          left: 5%;
          font-size: 50px;
          color: white;
      }
      




`;
        this.html = `
<div class="${this.id}-loading">
<div id="circle"></div></div>

<div id="${this.id}-overlay"><div id="text"><span style="font-size:20px;opacity: 0.5;">Vous regardez</span><br><span style="font-size:60px;" id="nome2">${this.stream.info.name}</span></div></div>

  <div class="${this.id}-container">
      <video preload="auto">
      <source src="${this.source}#t=0.2">
      </video>
      <div class="controls-container">
      <div class="progress-controls">

      <div class="progress-bar">
          <div class="watched-bar"></div>
          <div class="playhead"></div>
          <span class="mouse-display"><div id="timeline_preview" class="timeline_preview" style="display: none; position: absolute;"></div></span>
       </div>

     <div class="time-remaining">00:00</div></div>
       
          <div class="controls">
              <button class="play-pause">
                  <svg class="playing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"></path>        
                  </svg>
                  <svg class="paused" viewBox="0 0 24 24">
                  <path d="M4.5 3C4.22386 3 4 3.22386 4 3.5V20.5C4 20.7761 4.22386 21 4.5 21H9.5C9.77614 21 10 20.7761 10 20.5V3.5C10 3.22386 9.77614 3 9.5 3H4.5ZM14.5 3C14.2239 3 14 3.22386 14 3.5V20.5C14 20.7761 14.2239 21 14.5 21H19.5C19.7761 21 20 20.7761 20 20.5V3.5C20 3.22386 19.7761 3 19.5 3H14.5Z" ></path>
                  </svg>
              </button>
              <button class="rewind">
                  <svg viewBox="0 0 24 24">
                  <path  d="M11.0198 2.04817C13.3222 1.8214 15.6321 2.39998 17.5557 3.68532C19.4794 4.97067 20.8978 6.88324 21.5694 9.09718C22.241 11.3111 22.1242 13.6894 21.2388 15.8269C20.3534 17.9643 18.7543 19.7286 16.714 20.8192C14.6736 21.9098 12.3182 22.2592 10.0491 21.8079C7.77999 21.3565 5.73759 20.1323 4.26989 18.3439C2.80219 16.5555 2 14.3136 2 12L0 12C-2.74181e-06 14.7763 0.962627 17.4666 2.72387 19.6127C4.48511 21.7588 6.93599 23.2278 9.65891 23.7694C12.3818 24.3111 15.2083 23.8918 17.6568 22.5831C20.1052 21.2744 22.0241 19.1572 23.0866 16.5922C24.149 14.0273 24.2892 11.1733 23.4833 8.51661C22.6774 5.85989 20.9752 3.56479 18.6668 2.02238C16.3585 0.479975 13.5867 -0.214319 10.8238 0.057802C8.71195 0.2658 6.70517 1.02859 5 2.2532V1H3V5C3 5.55229 3.44772 6 4 6H8V4H5.99999C7.45608 2.90793 9.19066 2.22833 11.0198 2.04817ZM2 4V7H5V9H1C0.447715 9 0 8.55229 0 8V4H2ZM14.125 16C13.5466 16 13.0389 15.8586 12.6018 15.5758C12.1713 15.2865 11.8385 14.8815 11.6031 14.3609C11.3677 13.8338 11.25 13.2135 11.25 12.5C11.25 11.7929 11.3677 11.1759 11.6031 10.6488C11.8385 10.1217 12.1713 9.71671 12.6018 9.43389C13.0389 9.14463 13.5466 9 14.125 9C14.7034 9 15.2077 9.14463 15.6382 9.43389C16.0753 9.71671 16.4116 10.1217 16.6469 10.6488C16.8823 11.1759 17 11.7929 17 12.5C17 13.2135 16.8823 13.8338 16.6469 14.3609C16.4116 14.8815 16.0753 15.2865 15.6382 15.5758C15.2077 15.8586 14.7034 16 14.125 16ZM14.125 14.6501C14.5151 14.6501 14.8211 14.4637 15.043 14.0909C15.2649 13.7117 15.3759 13.1814 15.3759 12.5C15.3759 11.8186 15.2649 11.2916 15.043 10.9187C14.8211 10.5395 14.5151 10.3499 14.125 10.3499C13.7349 10.3499 13.4289 10.5395 13.207 10.9187C12.9851 11.2916 12.8741 11.8186 12.8741 12.5C12.8741 13.1814 12.9851 13.7117 13.207 14.0909C13.4289 14.4637 13.7349 14.6501 14.125 14.6501ZM8.60395 15.8554V10.7163L7 11.1405V9.81956L10.1978 9.01929V15.8554H8.60395Z" ></path>    
                  </svg>
              </button>
              <button class="fast-forward">
                  <svg viewBox="0 0 24 24">
                  <path d="M6.4443 3.68532C8.36794 2.39998 10.6778 1.8214 12.9802 2.04817C14.8093 2.22833 16.5439 2.90793 18 4H16V6H20C20.5523 6 21 5.55228 21 5V1H19V2.2532C17.2948 1.02858 15.288 0.265799 13.1762 0.0578004C10.4133 -0.214321 7.64153 0.479973 5.33315 2.02238C3.02478 3.56479 1.32262 5.85989 0.516716 8.51661C-0.28919 11.1733 -0.148983 14.0273 0.913448 16.5922C1.97588 19.1572 3.8948 21.2744 6.34325 22.5831C8.79169 23.8918 11.6182 24.3111 14.3411 23.7694C17.064 23.2278 19.5149 21.7588 21.2761 19.6127C23.0374 17.4666 24 14.7763 24 12L22 12C22 14.3136 21.1978 16.5555 19.7301 18.3439C18.2624 20.1323 16.22 21.3565 13.9509 21.8079C11.6818 22.2592 9.32641 21.9098 7.28604 20.8192C5.24567 19.7286 3.64657 17.9643 2.76121 15.8269C1.87585 13.6894 1.75901 11.3111 2.4306 9.09717C3.10218 6.88324 4.52065 4.97066 6.4443 3.68532ZM22 4V7H19V9H23C23.5523 9 24 8.55228 24 8V4H22ZM12.6018 15.5758C13.0389 15.8586 13.5466 16 14.125 16C14.7034 16 15.2077 15.8586 15.6382 15.5758C16.0753 15.2865 16.4116 14.8815 16.6469 14.3609C16.8823 13.8338 17 13.2135 17 12.5C17 11.7929 16.8823 11.1758 16.6469 10.6488C16.4116 10.1217 16.0753 9.71671 15.6382 9.43388C15.2077 9.14463 14.7034 9 14.125 9C13.5466 9 13.0389 9.14463 12.6018 9.43388C12.1713 9.71671 11.8385 10.1217 11.6031 10.6488C11.3677 11.1758 11.25 11.7929 11.25 12.5C11.25 13.2135 11.3677 13.8338 11.6031 14.3609C11.8385 14.8815 12.1713 15.2865 12.6018 15.5758ZM15.043 14.0909C14.8211 14.4637 14.5151 14.6501 14.125 14.6501C13.7349 14.6501 13.4289 14.4637 13.207 14.0909C12.9851 13.7117 12.8741 13.1814 12.8741 12.5C12.8741 11.8186 12.9851 11.2916 13.207 10.9187C13.4289 10.5395 13.7349 10.3499 14.125 10.3499C14.5151 10.3499 14.8211 10.5395 15.043 10.9187C15.2649 11.2916 15.3759 11.8186 15.3759 12.5C15.3759 13.1814 15.2649 13.7117 15.043 14.0909ZM8.60395 10.7163V15.8554H10.1978V9.01928L7 9.81956V11.1405L8.60395 10.7163Z" ></path>                    </svg>
              </button>
              <button class="volume">
                  <svg class="full-volume" viewBox="0 0 24 24">
                  <path d="M24 12C24 8.28699 22.525 4.72603 19.8995 2.10052L18.4853 3.51474C20.7357 5.76517 22 8.81742 22 12C22 15.1826 20.7357 18.2349 18.4853 20.4853L19.8995 21.8995C22.525 19.274 24 15.7131 24 12ZM11 4.00001C11 3.59555 10.7564 3.23092 10.3827 3.07613C10.009 2.92135 9.57889 3.00691 9.29289 3.29291L4.58579 8.00001H1C0.447715 8.00001 0 8.44773 0 9.00001V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00001ZM5.70711 9.70712L9 6.41423V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70712ZM16.0001 12C16.0001 10.4087 15.368 8.8826 14.2428 7.75739L12.8285 9.1716C13.5787 9.92174 14.0001 10.9392 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8285L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92896C18.9462 6.80432 19.9998 9.34786 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87829 17.157 7.84346 15.6567 6.34317L17.0709 4.92896Z" ></path>
                  </svg>
                  <svg class="full2-volume" viewBox="0 0 24 24">
                  <path d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM17.0709 4.92897C18.9462 6.80433 19.9998 9.34787 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87831 17.157 7.84347 15.6567 6.34318L17.0709 4.92897ZM14.2428 7.7574C15.368 8.88262 16.0001 10.4087 16.0001 12C16.0001 13.5913 15.368 15.1175 14.2428 16.2427L12.8285 14.8285C13.5787 14.0783 14.0001 13.0609 14.0001 12C14.0001 10.9392 13.5787 9.92176 12.8285 9.17161L14.2428 7.7574Z" ></path>                    </svg>
                  </svg>
                  <svg class="muted2" viewBox="0 0 24 24">
                  <path d="M11 4C11 3.59554 10.7564 3.2309 10.3827 3.07612C10.009 2.92134 9.57889 3.00689 9.29289 3.29289L4.58579 8H1C0.447715 8 0 8.44771 0 9V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4ZM5.70711 9.70711L9 6.41421V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70711ZM16.0001 12C16.0001 10.4087 15.368 8.88259 14.2428 7.75737L12.8285 9.17158C13.5787 9.92173 14.0001 10.9391 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8284L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12Z" ></path>
                  </svg>
                  <svg class="muted" viewBox="0 0 24 24">
                  <path d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z" ></path>
                  </svg>
                  <div class="slide">
                  <input type="range" class="slider" value="100" max="100"/>
                  <span class="countslider">0<span>
              </div>
              </button>
              
              <p class="title">
                  <span class="series">${this.stream.info.name}</span> <span class="episode">${this.stream.type === "series" ? "Saison 0 Episode 0" : "Le film"}</span>
              </p>

              <button class="next">
                  <svg viewBox="0 0 24 24">
                  <path d="M22 3H20V21H22V3ZM4.28615 3.61729C3.28674 3.00228 2 3.7213 2 4.89478V19.1052C2 20.2787 3.28674 20.9977 4.28615 20.3827L15.8321 13.2775C16.7839 12.6918 16.7839 11.3082 15.8321 10.7225L4.28615 3.61729ZM4 18.2104V5.78956L14.092 12L4 18.2104Z" ></path>
                  </svg>
              </button>

              <button class="time-rate">
              <svg viewBox="0 0 24 24">
<path d="M17.6427 7.43779C14.5215 4.1874 9.47851 4.1874 6.35734 7.43779C3.21422 10.711 3.21422 16.0341 6.35734 19.3074L4.91474 20.6926C1.02842 16.6454 1.02842 10.0997 4.91474 6.05254C8.823 1.98249 15.177 1.98249 19.0853 6.05254C22.9716 10.0997 22.9716 16.6454 19.0853 20.6926L17.6427 19.3074C20.7858 16.0341 20.7858 10.711 17.6427 7.43779ZM14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12C12.1792 12 12.3528 12.0236 12.518 12.0677L15.7929 8.79289L17.2071 10.2071L13.9323 13.482C13.9764 13.6472 14 13.8208 14 14Z"></path>                </svg>
        
<div class="rate">
<div class="item">x2</div>
<div class="item">x1.75</div>
<div class="item">x1.5</div>
<div class="item">x1.25</div>
<div class="item timerate-active">x1 (Normal)</div>
<div class="item">x0.75</div>
<div class="item">x0.5</div>
<div class="item">x0.25</div>
</div>
</button>


              <button class="full-screen">
                  <svg class="maximize" viewBox="0 0 24 24">
                  <path d="M0 5C0 3.89543 0.895431 3 2 3H9V5H2V9H0V5ZM22 5H15V3H22C23.1046 3 24 3.89543 24 5V9H22V5ZM2 15V19H9V21H2C0.895431 21 0 20.1046 0 19V15H2ZM22 19V15H24V19C24 20.1046 23.1046 21 22 21H15V19H22Z" >
                  </svg>
                  <svg class="minimize" viewBox="0 0 24 24">
                  <path  d="M24 8H19V3H17V9V10H18H24V8ZM0 16H5V21H7V15V14H6H0V16ZM7 10H6H0V8H5V3H7V9V10ZM19 21V16H24V14H18H17V15V21H19Z" ></path>
                  </svg>
              </button>

          </div>
      </div>
  </div>`;
        this.go();


    }

    async go() {

        await $(`#${this.id}`).html(`<style>${this.style}</style>${this.html}`)

        this.player = { document: document };
        this.player = {
            document: document,
            loading: this.player.document.getElementsByClassName(`${this.id}-loading`)[0],
            overlay: this.player.document.getElementById(`${this.id}-overlay`),

            videoContainer: this.player.document.querySelector(`.${this.id}-container`),
            video: this.player.document.querySelector(`.${this.id}-container video`),
            autoplay: false,

            controls: {
                controlsContainer: this.player.document.querySelector(`.${this.id}-container .controls-container`),
                rewindButton: this.player.document.querySelector(`.${this.id}-container .controls button.rewind`),
                fastForwardButton: this.player.document.querySelector(`.${this.id}-container .controls button.fast-forward`),
                fullScreenButton: this.player.document.querySelector(`.${this.id}-container .controls button.full-screen`),
                maximizeButton: this.player.document.querySelector(`.${this.id}-container .controls button.full-screen .maximize`),
                minimizeButton: this.player.document.querySelector(`.${this.id}-container .controls button.full-screen .minimize`),
                playPauseButton: this.player.document.querySelector(`.${this.id}-container .controls button.play-pause`),
                playButton: this.player.document.querySelector(`.${this.id}-container .controls button.play-pause .playing`),
                pauseButton: this.player.document.querySelector(`.${this.id}-container .controls button.play-pause .paused`),
            },

            progress: {
                progressControls: this.player.document.querySelector(`.${this.id}-container .progress-controls`),
                progressBar: this.player.document.querySelector(`.${this.id}-container .progress-controls .progress-bar`),
                watchedBar: this.player.document.querySelector(`.${this.id}-container .progress-controls .progress-bar .watched-bar`),
                watchedButton: this.player.document.querySelector(`.${this.id}-container .progress-controls .progress-bar .playhead`),
                bufferedBar: this.player.document.querySelector(`.${this.id}-container .progress-controls .progress-bar .buffered`),
                timeLeft: this.player.document.querySelector(`.${this.id}-container .progress-controls .time-remaining`),
                mouseDisplay: this.player.document.querySelector(`.${this.id}-container .progress-controls .progress-bar .mouse-display`),
                hoverTimeItem: this.player.document.querySelector(`.${this.id}-container .progress-controls .progress-bar .mouse-display .timeline_preview`),
            },

            volume: {
                volumeButton: this.player.document.querySelector(`.${this.id}-container .controls button.volume`),
                fullVolumeButton: this.player.document.querySelector(`.${this.id}-container .controls button.volume .full-volume`),
                full2VolumeButton: this.player.document.querySelector(`.${this.id}-container .controls button.volume .full2-volume`),
                muted2Button: this.player.document.querySelector(`.${this.id}-container .controls button.volume .muted2`),
                mutedButton: this.player.document.querySelector(`.${this.id}-container .controls button.volume .muted`),
                volumeSlide: this.player.document.querySelector(`.${this.id}-container .controls button.volume .slide`),
                volumeSlider: this.player.document.querySelector(`.${this.id}-container .controls button.volume .slide .slider`),
                volumeSliderCount: this.player.document.querySelector(`.${this.id}-container .controls button.volume .slide .countslider`),
                holdVolume: ""
            },

            time: {
                timeRate: this.player.document.querySelector(`.${this.id}-container .controls button.time-rate`),
                timeRateButton: this.player.document.querySelector(`.${this.id}-container .controls button.time-rate svg`),
                timeRateBlock: this.player.document.querySelector(`.${this.id}-container .controls button.time-rate .rate`),
                timeRateItem: this.player.document.querySelectorAll(`.${this.id}-container .controls button.time-rate .rate .item`),
            }

        };

        new PlayerVideo(this.player);

    };


}

class PlayerVideo {
    constructor(player) {
        this.player = player;
        this.go();
    }

    async go() {
        this.controlsTimeout = false;
        this.player.volume.allVolumeButton = [this.player.volume.fullVolumeButton, this.player.volume.full2VolumeButton, this.player.volume.muted2Button, this.player.volume.mutedButton]

        this.player.controls.controlsContainer.style.opacity = '0';
        this.player.progress.watchedBar.style.width = '0px';
        this.player.controls.pauseButton.style.display = 'none';
        this.player.controls.minimizeButton.style.display = 'none';

        this.time();
        this.progress();
        this.volume();
        this.timeRate();
        this.mouseup();
        this.keyup()
    };


    time() {
        this.player.video.addEventListener('loadeddata', async (e) => this.player.progress.timeLeft.innerText = await this.formatTime(e.target.duration));
        this.player.video.addEventListener("timeupdate", async () => this.timeUpdate());
        this.player.controls.rewindButton.addEventListener('click', () => this.timeRemove(10));
        this.player.controls.fastForwardButton.addEventListener('click', () => this.timeAdd(10));
        this.player.video.addEventListener('waiting', () => this.player.loading.style.display = "block");
        this.player.video.addEventListener('canplay', () => this.player.loading.style.display = "none");
        this.player.video.addEventListener("ended", () => window.location.href = "/")
    };

    progress() {
        const that = this;
        this.player.progress.progressBar.addEventListener("mousedown", async (event) => start(event));
        this.player.progress.progressBar.addEventListener("mouseup", async (event) => end(event));
        // this.player.progress.progressBar.addEventListener("touchstart", async (event) => start(event));
        // this.player.progress.progressBar.addEventListener("touchend", async (event) => end(event));
        async function start(event) {
            const pos = (event.pageX - (that.player.progress.progressBar.offsetLeft + that.player.progress.progressBar.offsetParent.offsetLeft)) / that.player.progress.progressBar.offsetWidth;
            const realtime = pos * that.player.video.duration;
            that.player.video.currentTime = realtime;
            that.player.progress.watchedBar.style.width = ((that.player.video.currentTime / that.player.video.duration) * 100) + '%';
            const currentTime = that.player.video.duration - realtime;
            that.player.progress.progressControls.addEventListener("mousemove", mouseMove, false);
            that.player.progress.timeLeft.textContent = await that.formatTime(currentTime)
        }
        async function mouseMove(event) {
            const pos = (event.pageX - (that.player.progress.progressBar.offsetLeft + that.player.progress.progressBar.offsetParent.offsetLeft)) / that.player.progress.progressBar.offsetWidth;
            const realtime = pos * that.player.video.duration;
            that.player.video.currentTime = realtime;
            that.player.progress.watchedBar.style.width = ((that.player.video.currentTime / that.player.video.duration) * 100) + '%';
            const currentTime = that.player.video.duration - realtime;
            that.player.progress.timeLeft.textContent = await that.formatTime(currentTime)
        };
        async function end(event) {
            const pos = (event.pageX - (that.player.progress.progressBar.offsetLeft + that.player.progress.progressBar.offsetParent.offsetLeft)) / that.player.progress.progressBar.offsetWidth;
            const realtime = pos * that.player.video.duration;
            that.player.video.currentTime = realtime;
            that.player.progress.watchedBar.style.width = ((that.player.video.currentTime / that.player.video.duration) * 100) + '%';
            const currentTime = that.player.video.duration - realtime;
            that.player.progress.progressControls.removeEventListener("mousemove", mouseMove, false);
            return that.player.progress.timeLeft.textContent = await that.formatTime(currentTime)
        }

        this.player.progress.progressBar.ondragstart = function () { return false };

        this.player.progress.progressBar.addEventListener("mouseover", (e) => this.player.progress.progressBar.style = `max-height: 8px;`)
        this.player.progress.progressBar.addEventListener("mousemove", async (event) => {
            const pos = (event.pageX - (that.player.progress.progressBar.offsetLeft + that.player.progress.progressBar.offsetParent.offsetLeft)) / that.player.progress.progressBar.offsetWidth;
            const currentTime = pos * that.player.video.duration;

            that.player.progress.hoverTimeItem.innerText = await that.formatTime(currentTime);
            that.player.progress.hoverTimeItem.style.left = `${that.player.progress.progressBar.offsetWidth * pos}px`;
            that.player.progress.mouseDisplay.style.left = `${that.player.progress.progressBar.offsetWidth * pos}px`;
            that.player.progress.hoverTimeItem.style.display = 'block';
            that.player.progress.mouseDisplay.style.display = 'block';
        });
        this.player.progress.progressBar.addEventListener("mouseout", () => {
            that.player.progress.hoverTimeItem.style.display = 'none';
            that.player.progress.mouseDisplay.style.display = 'none';
            that.player.progress.progressBar.style = ``;
        })
    };

    volume() {
        const that = this;
        this.player.volume.allVolumeButton.forEach(e => e.addEventListener('click', (e) => this.toggleMute(e)));
        this.player.volume.volumeButton.addEventListener("mouseover", (event) => this.player.volume.volumeSlide.style.display = "block");
        this.player.volume.volumeButton.addEventListener("mouseout", (event) => this.player.volume.volumeSlide.style.display = "none");
        this.player.video.addEventListener("volumechange", (e) => {
            const count = that.player.video.volume * 100;
            if (!that.player.video.muted) {
                that.player.volume.volumeSlider.value = count;
                that.player.volume.holdVolume = count == 0 ? 100 : count
            };
            if (count <= 0 && !that.player.video.muted) return that.toggleMute();
            that.verifVolumeButton()
        });
        this.player.volume.volumeSlider.addEventListener('input', async function (e) {
            const count = that.player.volume.volumeSlider.value;
            if (that.player.video.muted) await that.toggleMute();
            that.player.volume.volumeSliderCount.innerText = count;
            that.player.video.volume = count / 100;
        })
    };

    timeRate() {
        this.player.time.timeRate.addEventListener("mouseover", (event) => this.player.time.timeRateBlock.style.display = "block");
        this.player.time.timeRate.addEventListener("mouseout", (event) => this.player.time.timeRateBlock.style.display = "none");
        this.player.time.timeRateItem.forEach(i => {
            i.addEventListener("click", async (e) => {
                if (!i.classList.contains("timerate-active")) {
                    let time = i.innerText.replace("x", "").replace("(Normal)", "");;
                    time = Number(time);
                    i.classList.add("timerate-active");
                    this.player.video.playbackRate = time;
                    this.player.time.timeRateItem.forEach(async i2 => {
                        if (i.innerText !== i2.innerText && i2.classList.contains("timerate-active")) await i2.classList.remove("timerate-active");
                    })
                }
            })
        })
    };

    mouseup() {
        this.player.document.addEventListener('mousemove', () => this.displayControls());
        // full screen
        this.player.controls.fullScreenButton.addEventListener('click', (e) => this.toggleFullScreen(e));
        this.player.video.addEventListener("dblclick", (e) => this.toggleFullScreen(e));
        this.player.document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                this.player.controls.maximizeButton.style.display = '';
                this.player.controls.minimizeButton.style.display = 'none'
            } else {
                this.player.controls.maximizeButton.style.display = 'none';
                this.player.controls.minimizeButton.style.display = ''
            }
        });

        // pause
        this.player.controls.playPauseButton.addEventListener('click', (e) => this.playPause(e));
        this.player.video.addEventListener("click", (e) => this.playPause(e))
    };

    keyup() {
        this.player.document.addEventListener('keyup', (event) => {
            switch (event.keyCode) {
                // f
                case 70:
                    this.toggleFullScreen();
                    break;

                // Space
                case 32:
                    this.playPause();
                    break;

                // m
                case 77:
                    this.toggleMute();
                    break;

                //up arrow
                case 38:
                    if (this.player.video.muted) this.toggleMute();
                    this.player.video.volume += 10 / 100;
                    this.player.video.volume = (this.player.video.volume > 100 - (10 / 100)) ? 100 / 100 : this.player.video.volume;
                    break;

                //down arrow
                case 40:
                    if (this.player.video.muted) return;
                    this.player.video.volume -= 10 / 100;
                    this.player.video.volume = (this.player.video.volume < (10 / 100)) ? 0 : this.player.video.volume;
                    break;

                //left arrow
                case 37:
                    this.timeRemove(10);
                    break;

                //right arrow
                case 39:
                    this.timeAdd(10);
                    break;


                case 35://End
                    this.player.video.currentTime = this.player.video.duration;
                    this.timeUpdate();
                    break;
                case 36://Home
                    this.player.video.currentTime = 0;
                    this.timeUpdate();
                    break;

                case 48://0
                case 49://1
                case 50://2
                case 51://3
                case 52://4
                case 53://5
                case 54://6
                case 55://7
                case 56://8
                case 57://9
                    if (event.keyCode < 58 && event.keyCode > 47) {
                        const percent = (event.keyCode - 48) * 10;
                        this.player.video.currentTime = this.player.video.duration * percent / 100;
                        this.timeUpdate();
                    }
                    break;
            }

            this.displayControls()
        })
    };

    displayControls() {
        this.player.controls.controlsContainer.style.opacity = '1';
        this.player.document.body.style.cursor = 'initial';
        this.player.overlay.style.display = "none";
        if (!this.player.autoplay) {

            this.player.video.muted = true;
            this.player.volume.volumeSlider.value = 0;
            this.verifVolumeButton();
            this.playPause();
            this.player.autoplay = true;
        };
        if (this.controlsTimeout) {
            this.player.loading.style = "display: none;";
            clearTimeout(this.controlsTimeout)
        };
        this.controlsTimeout = setTimeout(() => {
            this.player.controls.controlsContainer.style.opacity = '0';
            this.player.document.body.style.cursor = 'none';
            if (this.player.video.paused) this.player.overlay.style.display = "block"
        }, 5000)
    };

    playPause() {
        if (this.player.video.paused) {
            this.player.video.play();
            this.player.controls.playButton.style.display = 'none';
            this.player.controls.pauseButton.style.display = ''
        } else {
            this.player.video.pause();
            this.player.controls.playButton.style.display = '';
            this.player.controls.pauseButton.style.display = 'none'
        }
    };

    toggleFullScreen() {
        if (!this.player.document.fullscreenElement) {
            this.player.videoContainer.requestFullscreen()
        } else {
            this.player.document.exitFullscreen()
        }
    };

    formatTime(s) {
        const time = new Date(null);
        time.setSeconds(s);
        let hours = null;
        if (s >= 3600) {
            hours = (time.getHours().toString()).padStart('2', '0');
        };
        let minutes = (time.getMinutes().toString()).padStart('2', '0');
        let seconds = (time.getSeconds().toString()).padStart('2', '0');
        return `${hours ? `${hours}:` : ''}${minutes}:${seconds}`
    };

    async timeUpdate() {
        this.player.progress.watchedBar.style.width = ((this.player.video.currentTime / this.player.video.duration) * 100) + '%';
        const totalSecondsRemaining = this.player.video.duration - this.player.video.currentTime;
        const time = await this.formatTime(totalSecondsRemaining);
        this.player.progress.timeLeft.textContent = time
    };

    timeAdd(time) {
        this.player.video.currentTime += time;
        this.player.video.currentTime = (this.player.video.currentTime > this.player.video.duration - time) ? this.player.video.duration : this.player.video.currentTime;
        this.timeUpdate()
    };

    timeRemove(time) {
        this.player.video.currentTime -= time;
        this.player.video.currentTime = (this.player.video.currentTime < time) ? 0 : this.player.video.currentTime;
        this.timeUpdate()
    };

    toggleMute() {
        this.player.video.muted = !this.player.video.muted;
        if (this.player.video.muted) {
            this.player.volume.volumeSlider.value = 0;
            this.player.volume.volumeSliderCount.innerText = 0;
            this.verifVolumeButton()
        } else {
            this.player.volume.volumeSlider.value = this.player.volume.holdVolume === "" ? 100 : this.player.volume.holdVolume;
            this.player.volume.volumeSliderCount.innerText = this.player.volume.holdVolume === "" ? 100 : this.player.volume.holdVolume;
            this.player.video.volume = this.player.volume.holdVolume === "" ? 100 / 100 : this.player.volume.holdVolume / 100;
            this.verifVolumeButton()
        }
    };

    verifVolumeButton() {
        const count = this.player.volume.volumeSlider.value || 0;
        this.player.volume.allVolumeButton.forEach(i => i.style.display = "none");
        if (count <= 0 || this.player.video.muted) {
            return this.player.volume.mutedButton.style.display = 'block'
        } else if (count <= 50 && count != 0) {
            return this.player.volume.muted2Button.style.display = 'block'
        } else if (50 < count && count <= 70) {
            return this.player.volume.full2VolumeButton.style.display = 'block'
        } else if (count <= 100 && 70 < count) {
            return this.player.volume.fullVolumeButton.style.display = 'block'
        }
    };

};