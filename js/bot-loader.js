/**
 * Theme configuration returned by the server
 * @typedef {Object} ThemeConfig
 * @property {string[]} javascript List of javascript source urls
 * @property {string[]} stylesheet List of css source urls
 * @property {ExternalResource[]} resources optional resources
 * @property {string} bubbleImage image to be shown in the chat bubble
 * @property {string} iframeSource The URL to be set as the iframe source
 * @property {string} bubbleBackgroundColor Chat bubble's background color
 * @property {Number} windowHeight Chat window height
 * @property {Number} windowWidth Chat window width
 * @property {string} chatWithUsMessage The message to show beneath the chat bubble
 * @property {boolean} hideChatbot When set to "True", chatbot will not be rendered
 * @property {string} botPosition position of the bot, valid values are {"left", "right", "center"}. Default is "right"
 * @property {string} bubbleStyle bubble display style
 */

/**
 * External Resource Description
 * @typedef {Object} ExternalResource
 * @property {string} resourceType valid values are "script", "stylesheet"
 * @property {string} resourceUrl The absolute URL identifying the resource
 */

(() => {

    const CHAT_BUBBLE_TEMPLATE_STYLE1 = `
    <div id="kenytChatBubble" class="unreadcount">
        <div id="kenytBubbleContainer" class="kchannels-container">
            <div class="kchannel-group">    
            </div>
        </div>

        <div id="messageWrapperBox" class="kpopup-container chatWithUsMessageWrapper ktext-color">
            <div class="kpopup-text chatWithUsMessage">
             
            </div>
            <button id="chatNowBtn" class="kprimary-color">Chat Now</button>
        </div>
        <div class="kbubble-container kprimary-bg kprimary-border">
            <div id="bubbleTail"></div>
            <div class="img-container">
            </div>
        </div>
        <div class="kconnectors-container kprimary-bg kprimary-border">
            <div id="krazorpay-btn" class="krazorpay-btn k-hide connector">
            </div>

            <div id="kcashfree-btn" class="kcashfree-btn k-hide connector">
            </div>
        </div>
    </div>`;

    const CHAT_BUBBLE_TEMPLATE_STYLE2 = `
    <div id="kenytChatBubble" class="unreadcount">
        <div class="kchannels-container">
            <div class="kstrip">    
            </div>
            <div class="kchannel-group">    
            </div>
        </div>
        <div class="kpopup-container ksecondary-bg ktext-color">
            <div class="kpopup-text">
            </div>
        </div>
        <div class="kbubble-container kprimary-bg">
            <div class="img-container">
            </div>
        </div>
        <div class="kconnectors-container kprimary-bg kprimary-border">
             <div id="krazorpay-btn" class="krazorpay-btn k-hide connector">
            </div>

            <div id="kcashfree-btn" class="kcashfree-btn k-hide connector">
            </div>
        </div>
    </div >`;

    const CHAT_BUBBLE_TEMPLATE_STYLE3 = `
    <div id="kenytChatBubble" class="unreadcount">
        <div id="kenytBubbleContainer" class="kchannels-container">
            <div class="kchannel-group">    
            </div>
        </div>

        <div id="messageWrapperBox" class="kpopup-container chatWithUsMessageWrapper ktext-color">
            <div class="kpopup-text chatWithUsMessage">
             
            </div>
            <button id="chatNowBtn" class="kprimary-color">Chat Now</button>
        </div>
        <div class="kbubble-container kprimary-bg kprimary-border">
            <div id="bubbleTail"></div>
            <div class="img-container">
            </div>
        </div>
        <div class="kconnectors-container kprimary-bg kprimary-border">
            <div id="krazorpay-btn" class="krazorpay-btn k-hide connector">
            </div>

            <div id="kcashfree-btn" class="kcashfree-btn k-hide connector">
            </div>
        </div>
    </div>`;

    const CHAT_BUBBLE_TEMPLATE_EMBEDDED = `
    <div id="kenytChatBubble">
        <div class="kchannels-container k-d-none">
            <div class="kstrip">    
            </div>
            <div class="kchannel-group">    
            </div>
        </div>
        <div class="kpopup-container ksecondary-bg ktext-color k-d-none">
            <div class="kpopup-text">
            </div>
        </div>
        <div class="kbubble-container kprimary-bg">
            <div class="img-container">
            </div>
        </div>
        <div class="kconnectors-container kprimary-bg kprimary-border k-d-none">
             <div id="krazorpay-btn" class="krazorpay-btn k-hide connector">
            </div>

            <div id="kcashfree-btn" class="kcashfree-btn k-hide connector">
            </div>
        </div>
    </div >`;

    const BUBBLE_PRIMARY_BG = "kprimary-bg";
    const BUBBLE_SECONDARY_BG = "ksecondary-bg";
    const BUBBLE_SECONDARY_BG_VERTICAL = "ksecondary-bg-v";
    const BUBBLE_TEXT_COLOR = "ktext-color";
    const BUBBLE_PRIMARY_COLOR = "kprimary-color";
    const BUBBLE_PRIMARY_BORDER = "kprimary-border";

    const ENDPOINT = "/api/chatwindow/getthemeconfig";
    const PROD_PREFIX = "/botapp";
    const CHATBUBBLE_ID = "kenytChatBubble";
    const TEXTBUBBLE_ID = "kenytTextBubble";
    const WHATSAPPBUBBLE_ID = "kenytWhatsappBubble";
    const FACEBOOKBUBBLE_ID = "kenytFacebookBubble";
    const INSTAGRMBUBBLE_ID = "kenytInstagramBubble";
    const PHONEBUBBLE_ID = "kenytPhoneBubble";
    const kenytChatWindowContainerId = "chatbox-container";
    const IFRAME_ID = "kenytChatWindow";
    const SCRIPT_NAME = "bot-loader.js";
    const POSITION_RIGHT = "right";
    const UNREAD_COUNT_SESSION_KEY = "__kenytUnreadCount";
    const unreadCountAttribute = "data-unreadcount";
    const POPUP_ANIMATION_TIME_SECONDS = 2; // Open + Close
    const POPUP_READ_TIME_SECONDS = 4;
    const POPUP_WAIT_TIME_SECONDS = 10;
    const POPUP_CLOSE_AFTER_TIME = (POPUP_ANIMATION_TIME_SECONDS + POPUP_READ_TIME_SECONDS) * 1000;
    const POPUP_REOPEN_TIME = (POPUP_WAIT_TIME_SECONDS + POPUP_READ_TIME_SECONDS + 2 * POPUP_ANIMATION_TIME_SECONDS) * 1000;

    const CHANNEL_ICON_ANIMATION_TIME_SECONDS = 1.5;
    const CHANNEL_ICON_BUFFER_TIME_SECONDS = 3.00;

    const positionClasses = {
        center: "position-center",
        left: "position-left",
        right: "position-right",
        bottom: "position-bottom",
    };
    const BUBBLE_DEFAULT_STYLE = "style1";
    const BUBBLE_STYLE_2 = "style2";
    const BUBBLE_STYLE_3 = "style3";
    const EMBED_STYLE = "style-embed";

    var iframeEventType = {
        UnreadMessage: 'kenytUnreadMessage',
        CustomEventDispatch: 'kenytCustomEventDispatch',
        Custom_ContactFormSubmit: 'kenyt_ContactFormSubmit', // TODO : Move them to custom event type
        GenericFormSubmit: 'kenyt_GenericFormSubmit',
        UpdateAttentionMessage: 'kenytUpdateAttentionMessage',
        FirebaseToken: 'kenytFirebaseToken',
    };

    var scriptElement;
    for (let i = 0; i < document.scripts.length; i++) {
        if (document.scripts[i].src.indexOf(SCRIPT_NAME) >= 0) {
            scriptElement = document.scripts[i];
            break;
        }
    }

    var API_ENDPOINT;
    var botName, rootUrl = "", botPosition, botPositionClass, bubbleStyle, isTestMode;
    var origin;
    var unreadMessageCount = 0;
    var nextUnreadMessage = null;

    // polyfill for String.startsWith() to work in Internet Explorer
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (searchString, position) {
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }

    // Components of the chat bubble
    var kenytChatBubble = {
        element: null,
        primaryColor: null,
        opacity: null,
        textColor: null,
        style: null,

        channelContainer: {
            element: null,
            group: null,
            channels: [],
            iconElements: [],
        },
        popupContainer: {
            element: null,
            container: null,
            config: null,
        },
        bubbleContainer: {
            element: null,
            imageUrl: null,
        },
        connectorContainer: {
            element: null,
            razorpay: {
                element: null,
                btn: null,
            },
            cashfree: {
                element: null,
                btn: null
            }
        },
        stripAnimation: null,
    };
    let chatWindow = {};
    let firebaseAppConfig = null;

    // Initialize chat window
    (() => {
        rootUrl = extractRootUrl();
        botName = getScriptParam("data-bot");
        botPosition = getScriptParam("data-position");
        bubbleStyle = getScriptParam("data-bubblestyle");
        isTestMode = (getScriptParam("data-istest") || "").toLowerCase() === "true";
        document.kenytRootUrl = rootUrl;

        //https://stackoverflow.com/questions/4540753/should-i-use-encodeuri-or-encodeuricomponent-for-encoding-urls
        origin = window.location.href;
        API_ENDPOINT = detectEndPoint();

        if (!botName && origin.indexOf("myshopify.com") > 0) {
            botName = origin;
        }

        if (!botName) {
            console.error("[Kenyt.AI] Invalid botname parameter");
        }
        // Stop the process if botname is missing/null
        else {
            var request = new XMLHttpRequest();
            request.addEventListener('load', () => {
                let response = JSON.parse(request.response);
                bootstrap(response);
            });
            request.open("GET", `${API_ENDPOINT}?botid=${botName}`, true);
            request.send();
        }
    })();

    /**
     * Create basic layouts and containers 
     * @param {ThemeConfig} themeConfig 
     */
    function bootstrap(themeConfig) {
        if (!botPosition && themeConfig.botPosition && typeof themeConfig.botPosition === 'string') {
            let position = themeConfig.botPosition.trim().toLowerCase();
            if (position) {
                botPosition = position;
            }
        }

        //bubbleStyle = "style1";
        if (!bubbleStyle && themeConfig.bubbleStyle && typeof themeConfig.bubbleStyle === 'string') {
            bubbleStyle = themeConfig.bubbleStyle;
        }

        botPositionClass = getPositionClass(botPosition);
        //let hideChatbot = themeConfig.hideChatbot && window.location.host.indexOf("kenyt.ai") < 0;
        let hideChatbot = themeConfig.hideChatbot;
        let hideChatbotv2 = themeConfig.hideChatbotV2;
        if (hideChatbotv2) {
            hideChatbot = hideChatbotv2;
        }

        createChatBubble(themeConfig.bubble, bubbleStyle, botPositionClass);

        function loadChatbot() {

            let isHideChatbot = false;
            if (hideChatbot == "All" ||
                (hideChatbot == "Mobile" && isMobileDevice()) ||
                (hideChatbot == "Desktop" && !isMobileDevice())
            ) {
                isHideChatbot = true && window.location.host.indexOf("kenyt.ai") < 0;
            }

            chatWindow = document.getElementById(kenytChatWindowContainerId)
            if (!chatWindow) {
                chatWindow = createChatWindow(
                    themeConfig.iframeSource,
                    themeConfig.botType,
                    themeConfig.deviceSettings,
                    isHideChatbot,
                    botPositionClass,
                    isTestMode,
                    themeConfig.setUserDataForBot,
                    themeConfig.hideChatHistory,
                    themeConfig.enablePortal,
                    themeConfig.enableHomePortal,
                    themeConfig.enableMessagePortal,
                    themeConfig.enableMessageFeedback
                );
            }

            chatWindow.classList.add(bubbleStyle);
            if (!document.body) {
                console.error('[Kenyt.AI] Cannot inject chatbot - Document load complete, but missing body');
                console.error(document);
                // Try again after 2 secs
                setTimeout(loadChatbot, 2000);
            }
            else {
                if (document.kenytBotLoaded && document.kenytBotLoaded === botName) {
                    console.warn('[Kenyt.AI] Loader script imported more than once, ignoring duplicate loads');
                }
                else {
                    if (document.kenytBotLoaded && document.kenytBotLoaded !== botName) {
                        var oldChatBubble = document.getElementById(CHATBUBBLE_ID);
                        if (oldChatBubble) {
                            oldChatBubble.remove();
                        }
                        var oldChatWindow = document.getElementById(IFRAME_ID);
                        if (oldChatWindow) {
                            oldChatWindow.remove();
                        }
                    }

                    document.kenytBotLoaded = botName;
                    if (isHideChatbot) {
                        kenytChatBubble.element.style.display = "none";
                        chatWindow.style.display = "none";
                    }
                    else {
                        injectScripts(themeConfig);
                    }
                }
            }

            window.addEventListener('message', function (event) {
                // TODO: add a origin check
                if (typeof event.data === "object" && event.data.type) {
                    /**
                     * @type {IframeEvent}
                     */
                    let iframeEvent = event.data;

                    if (iframeEvent.type === iframeEventType.CustomEventDispatch) {
                        /** @type {CustomEventInfo} */
                        let eventInfo = iframeEvent.value;
                        if (eventInfo && eventInfo.EventName &&
                            eventInfo.EventName === iframeEventType.Custom_ContactFormSubmit) {

                            if (kenyt_gtag && eventInfo.EventData) {
                                kenyt_gtag('event', 'contact_form_submitted', eventInfo.EventData);
                            }

                            if (kenyt_gtag && themeConfig.googleAnalyticsEvents && themeConfig.googleAnalyticsEvents[iframeEventType.Custom_ContactFormSubmit]) {
                                var eventsData = themeConfig.googleAnalyticsEvents[iframeEventType.Custom_ContactFormSubmit];
                                for (var key in eventsData) {
                                    kenyt_gtag('event', key, eventsData[key]);
                                }
                            }

                            if (typeof fbq !== 'undefined' && fbq && themeConfig.facebookPixelId) {
                                fbq('track', 'Lead');
                            }

                            //https://developers.google.com/tag-manager/devguide#migration
                            if (themeConfig.googleTagManagerId) {
                                window.dataLayer = window.dataLayer || [];
                                window.dataLayer.push({
                                    'gtm.start': new Date().getTime(),
                                    event: 'gtm.js'
                                });
                                document.head.appendChild(createScriptNode("https://www.googletagmanager.com/gtm.js?id=" + themeConfig.googleTagManagerId, true));
                            }
                        }
                    }
                    else if (iframeEvent.type === iframeEventType.UnreadMessage) {

                        unreadMessageCount = getUnreadMessageCount();
                        unreadMessageCount += 1;
                        if (unreadMessageCount > 0) {
                            setUnreadMessageCount(unreadMessageCount);
                        }

                        //this.alert(iframeEvent.value);
                        if (themeConfig.toggleAttentionMessage &&
                            iframeEvent.value && !nextUnreadMessage) {
                            nextUnreadMessage = {};
                            nextUnreadMessage.markedEle = iframeEvent.value;
                        }
                    }
                    else if (iframeEvent.type === iframeEventType.UpdateAttentionMessage) {
                        var data = {};
                        if (iframeEvent.value) {
                            data.text = iframeEvent.value;
                            setPopupText(data);
                        }
                        else {
                            setPopupText(kenytChatBubble.popupContainer.config);
                        }
                    }
                    else if (iframeEvent.type === iframeEventType.FirebaseToken) {
                        saveFirebaseToken();
                    }
                }
            }, false);
        }

        let loadMode = themeConfig.loadMode || "Normal";

        //https://stackoverflow.com/questions/9899372/pure-javascript-equivalent-of-jquerys-ready-how-to-call-a-function-when-t
        if (document.readyState === "complete" || document.readyState === "interactive") {

            switch (loadMode) {
                case "Delayed":
                    window.setTimeout(() => { loadChatbot(); }, 5000);
                    break;
                case "Quick":
                default:
                    loadChatbot();
                    break;
            }
        }
        else {
            switch (loadMode) {
                case "Quick":
                    loadChatbot();
                    break;
                case "Delayed":
                    window.setTimeout(() => { loadChatbot(); }, 5000);
                    break;
                default:
                    window.addEventListener('DOMContentLoaded', () => {
                        loadChatbot();
                    });
                    break;
            }
        }

        if (themeConfig.firebaseConfig) {
            firebaseAppConfig = themeConfig.firebaseConfig;
        }
    }

    function renderChatbot(themeConfig) {

        if (kenytChatBubble.embedElement) {
            kenytChatBubble.embedElement.appendChild(kenytChatBubble.element);
        }
        else {
            document.body.appendChild(kenytChatBubble.element);
        }

        toggleUnreadMessages();
        if (kenytChatBubble.channelContainer.iconElements &&
            kenytChatBubble.channelContainer.iconElements.length) {

            animateChannelIcon(kenytChatBubble.channelContainer.iconElements, kenytChatBubble.channelContainer.iconElements.length - 1);
        }

        if (themeConfig.bubble.shakeInterval > 0) {

            setInterval(() => {
                try {
                    kenytChatBubble.bubbleContainer.element.classList.remove("shake")
                    void kenytChatBubble.bubbleContainer.element.offsetWidth;
                } catch (e) {
                    console.log(e)
                }

                kenytChatBubble.bubbleContainer.element.classList.add("shake")

            }, Number(themeConfig.bubble.shakeInterval) * 1000)
        }

        if (!bubbleStyle || bubbleStyle === BUBBLE_DEFAULT_STYLE) {

            //var bubbleTailEle = document.getElementById("bubbleTail");
            //bubbleTailEle.style.borderTopColor = themeConfig.bubble.primaryColor;
        }
        else {
            setInterval(function () { toggleUnreadMessages(); }, POPUP_REOPEN_TIME);
        }

        // prevent chat window positioning for all other bubble styles except style1
        document.body.appendChild(chatWindow);

        // Initialize the kenyt based gtag call
        if (themeConfig.googleAnalyticsId) {
            if (typeof gtag !== 'undefined' && gtag) {
                kenyt_gtag = gtag;
            }
            else {
                document.head.appendChild(createScriptNode("https://www.googletagmanager.com/gtag/js?id=" + themeConfig.googleAnalyticsId));
                window.dataLayer = window.dataLayer || [];
                kenyt_gtag('js', new Date());
                kenyt_gtag('config', themeConfig.googleAnalyticsId);
            }
        }

        if (themeConfig.facebookPixelId) {
            if (typeof fbq !== 'undefined' && fbq) {
            }
            else {
                !function (f, b, e, v, n, t, s) {
                    if (f.fbq) return; n = f.fbq = function () {
                        n.callMethod ?
                            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                    };
                    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                    n.queue = []; t = b.createElement(e); t.async = !0;
                    t.src = v; s = b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s)
                }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', themeConfig.facebookPixelId);
                fbq('track', 'PageView');

                //<img height="1" width="1" style="display:none" src = "https://www.facebook.com/tr?id={your-pixel-id-goes-here}&ev=PageView&noscript=1" />
                var img = document.createElement("img");
                img.src = "https://www.facebook.com/tr?id=" + themeConfig.facebookPixelId + "&ev=PageView&noscript=1";
                img.height = "1";
                img.width = "1";
                img.style = "display:none";
                document.body.appendChild(img);
            }
        }
    }

    function toggleUnreadMessages() {
        if (nextUnreadMessage) {
            setPopupText(nextUnreadMessage);
            nextUnreadMessage = null;
        }
        else {
            setPopupText(kenytChatBubble.popupContainer.config);
        }
    }

    function animateChannelIcon(iconElements, index) {
        if (iconElements && iconElements.length) {
            if (index < 0) {
                index = iconElements.length - 1;
            }

            var iconEle = iconElements[index];
            iconEle.classList.add("kanimate");
            window.setTimeout(
                () => {
                    iconEle.classList.remove("kanimate");
                    window.setTimeout(
                        () => {
                            animateChannelIcon(iconElements, index - 1);
                        }, CHANNEL_ICON_BUFFER_TIME_SECONDS * 1000);
                }, CHANNEL_ICON_ANIMATION_TIME_SECONDS * 1000);
        }
    }

    /**
     * Inject stylesheets and script tags
     * @param {ThemeConfig} themeConfig 
     */
    function injectScripts(themeConfig) {
        if (themeConfig) {

            var renderOnLoad = true

            themeConfig.stylesheet.forEach(linkUrl => {
                document.head.appendChild(createLinkNode(`${rootUrl}${linkUrl}`, renderOnLoad, themeConfig));
                renderOnLoad = false;
            });

            themeConfig.resources.forEach(externalResource => {
                externalResource.resourceType = externalResource.resourceType || '';

                let firstStylesheet = document.head.getElementsByTagName("link");
                if (firstStylesheet && firstStylesheet.length > 0) {
                    firstStylesheet = firstStylesheet[0];
                }
                else {
                    firstStylesheet = null;
                }

                {
                    switch (externalResource.resourceType) {
                        case 'script':
                            if (externalResource.resourceUrl) {
                                document.head.appendChild(createScriptNode(externalResource.resourceUrl));
                            }
                            else if (externalResource.resourceContent) {

                                //document.head.appendChild(createScriptNodeByContent(externalResource.resourceContent));
                            }
                            break;
                        case 'stylesheet':
                            if (externalResource.resourceUrl) {
                                let linkNode = createLinkNode(externalResource.resourceUrl);
                                if (firstStylesheet) {
                                    document.head.insertBefore(linkNode, firstStylesheet);
                                }
                                else {
                                    document.head.appendChild(linkNode);
                                }
                            }
                            break;
                        default:
                            console.warn('Unknown external resource type ignored', externalResource.resourceType);
                    }
                }
            });
            if (themeConfig.customCss) {
                let styleNode = document.createElement("style");
                styleNode.innerText = themeConfig.customCss;
                document.head.appendChild(styleNode);
            }
        }
    }

    function createScriptNode(scriptUrl, isAsync, renderOnLoad) {
        let scriptNode = document.createElement("script");
        scriptNode.setAttribute("src", scriptUrl);
        scriptNode.type = "text/javascript";
        scriptNode.async = isAsync;

        if (scriptUrl.indexOf("portal.js") > -1) {
            Object.entries(scriptElement.attributes).map(([key, value]) => {
                if (key.startsWith("data-")) {
                    scriptNode.setAttribute(key, value);
                }
            })
        }

        if (renderOnLoad) {
            scriptNode.onload = function () {
                var window = document.getElementById(IFRAME_ID);
                var srcUrl = window.getAttribute("src_to_set");
                if (srcUrl) {
                    window.removeAttribute("src_to_set");
                    window.setAttribute("src", srcUrl);
                }
            }
        }

        return scriptNode;
    }

    function createScriptNodeByContent(content) {
        let scriptNode = document.createElement("script");

        scriptNode.text = content;

        return scriptNode;
    }

    function createLinkNode(stylesheetUrl, renderOnLoad, themeConfig) {
        let linkNode = document.createElement("link");
        linkNode.setAttribute("href", stylesheetUrl);
        linkNode.rel = "stylesheet";

        if (renderOnLoad) {
            linkNode.onload = function () {
                renderChatbot(themeConfig);
                themeConfig.javascript.forEach(scriptUrl => {
                    document.head.appendChild(createScriptNode(`${rootUrl}${scriptUrl}`, false, renderOnLoad));
                    if (renderOnLoad) {
                        let nsEle = document.createElement("noscript");
                        nsEle.innerHTML = "Enable JavaScript to use the Generative AI powered Kenyt<a href=\"https://www.kenyt.ai/\" rel=\"noopener nofollow\" target=\"_blank\">AI chatbot</a> or AI Assistant.";
                        document.head.appendChild(nsEle);
                    }
                    renderOnLoad = false;
                });
            }
        }
        return linkNode;
    }

    /**
     * Create a floating chat bubble
     * @param {ThemeConfig} themeConfig 
     * @param {string} position
     */
    function createChatBubble(themeConfig, styleClass, positionClass) {
        kenytChatBubble = {};

        var bubbleTemplate = CHAT_BUBBLE_TEMPLATE_STYLE1;
        if (!styleClass || styleClass === BUBBLE_DEFAULT_STYLE) {
            styleClass = BUBBLE_DEFAULT_STYLE;
            bubbleTemplate = CHAT_BUBBLE_TEMPLATE_STYLE1;
        }
        else if (styleClass === BUBBLE_STYLE_2) {
            styleClass = BUBBLE_STYLE_2;
            bubbleTemplate = CHAT_BUBBLE_TEMPLATE_STYLE2;
        }
        else {
            styleClass = BUBBLE_STYLE_3;
            bubbleTemplate = CHAT_BUBBLE_TEMPLATE_STYLE3;
        }

        if (themeConfig.embedElementId) {
            kenytChatBubble.embedElement = document.getElementById(themeConfig.embedElementId);
            if (kenytChatBubble.embedElement) {
                styleClass = EMBED_STYLE;
                bubbleTemplate = CHAT_BUBBLE_TEMPLATE_EMBEDDED;
            }
        }

        kenytChatBubble.element = htmlToElement(bubbleTemplate);
        kenytChatBubble.element.classList.add(styleClass);
        kenytChatBubble.element.classList.add(positionClass);

        // Popup Container
        kenytChatBubble.popupContainer = {};
        kenytChatBubble.popupContainer.element = kenytChatBubble.element.getElementsByClassName("kpopup-container")[0];
        kenytChatBubble.popupContainer.container = kenytChatBubble.popupContainer.element.getElementsByClassName("kpopup-text")[0];

        // Channel Container
        kenytChatBubble.channelContainer = {};
        kenytChatBubble.channelContainer.element = kenytChatBubble.element.getElementsByClassName("kchannels-container")[0];
        kenytChatBubble.channelContainer.container = kenytChatBubble.element.getElementsByClassName("kchannel-group")[0];
        kenytChatBubble.channelContainer.strip = kenytChatBubble.element.getElementsByClassName("kstrip")[0];
        kenytChatBubble.channelContainer.iconElements = [];

        // Bubble Container
        kenytChatBubble.bubbleContainer = {};
        kenytChatBubble.bubbleContainer.element = kenytChatBubble.element.getElementsByClassName("kbubble-container")[0];
        kenytChatBubble.bubbleContainer.container = kenytChatBubble.element.getElementsByClassName("img-container")[0];
        if (kenytChatBubble.bubbleContainer.container && themeConfig.bubbleBackgroundColor) {
            kenytChatBubble.bubbleContainer.container.style.backgroundColor = themeConfig.bubbleBackgroundColor;
        }

        // Connector Container
        kenytChatBubble.connectorContainer = {};
        kenytChatBubble.connectorContainer.element = kenytChatBubble.element.getElementsByClassName("kconnectors-container")[0];
        if (kenytChatBubble.connectorContainer.element) {
            kenytChatBubble.connectorContainer.razorpay = {};
            kenytChatBubble.connectorContainer.razorpay.element = kenytChatBubble.connectorContainer.element.getElementsByClassName("krazorpay-btn")[0];
            kenytChatBubble.connectorContainer.element.style.backgroundColor = themeConfig.bubbleBackgroundColor;

            kenytChatBubble.connectorContainer.cashfree = {};
            kenytChatBubble.connectorContainer.cashfree.element = kenytChatBubble.connectorContainer.element.getElementsByClassName("kcashfree-btn")[0];
        }

        if (!styleClass || styleClass === BUBBLE_DEFAULT_STYLE) {
            if (!themeConfig.popupConfig.text) {
                kenytChatBubble.popupContainer.element.style.display = "none";
            }
        }
        else {
            kenytChatBubble.popupContainer.element.style.animationDuration = POPUP_ANIMATION_TIME_SECONDS + "s";
            //kenytChatBubble.channelContainer.strip.style.animationDuration = POPUP_ANIMATION_TIME_SECONDS + "s";
        }

        kenytChatBubble.popupContainer.element.style.color = themeConfig.textColor;
        kenytChatBubble.popupContainer.config = themeConfig.popupConfig;

        if (themeConfig.channelConfig &&
            themeConfig.channelConfig.channels &&
            themeConfig.channelConfig.channels.length) {
            themeConfig.channelConfig.channels.forEach(channelEntry => {

                //<a class="kchannel-icon" target="_blank" href="https://www.google.com">
                //    <img src="C:\Users\praty\Downloads\Chat Bubble Design _ Light View (1)\Group 22132@2x.png" />
                //</a>
                var channelDetails = getChannelDetails(channelEntry, themeConfig.ipAddress);
                if (channelDetails && channelEntry.imageUrl) {
                    let channelIcon = document.createElement("a");

                    if (channelDetails.link) {
                        channelIcon.target = "_blank";
                        channelIcon.href = channelDetails.link;
                    }

                    channelIcon.id = channelDetails.id;
                    channelIcon.classList.add("kchannel-icon");


                    var bkgElement = document.createElement("span");
                    bkgElement.classList.add("khighlight-background");
                    if (channelEntry.color) {
                        bkgElement.style.backgroundColor = channelEntry.color;
                    }
                    channelIcon.appendChild(bkgElement);

                    var channelImage = document.createElement("img");

                    channelImage.src = `${rootUrl}${channelEntry.imageUrl}`;
                    channelIcon.appendChild(channelImage);

                    kenytChatBubble.channelContainer.iconElements.push(channelIcon);
                    kenytChatBubble.channelContainer.container.appendChild(channelIcon);
                }
            });
        }
        else {
            kenytChatBubble.channelContainer.container.classList.add("k-hide");
        }

        // Unread Count from session
        unreadMessageCount = getUnreadMessageCount();
        setUnreadMessageCount(unreadMessageCount);

        // THEME Setup
        // https://stackoverflow.com/questions/3871547/js-iterating-over-result-of-getelementsbyclassname-using-array-foreach
        if (themeConfig.primaryColor) {
            var pelements = kenytChatBubble.element.getElementsByClassName(BUBBLE_PRIMARY_BG);
            Array.from(pelements).forEach(ele => {
                ele.style.backgroundColor = themeConfig.primaryColor;
            })

            pelements = kenytChatBubble.element.getElementsByClassName(BUBBLE_PRIMARY_COLOR);
            Array.from(pelements).forEach(ele => {
                ele.style.color = themeConfig.primaryColor;
            });

            pelements = kenytChatBubble.element.getElementsByClassName(BUBBLE_PRIMARY_BORDER);
            Array.from(pelements).forEach(ele => {
                ele.style.borderColor = themeConfig.primaryColor;
            });
        }

        if (themeConfig.secondaryColorGradient) {
            var selements = kenytChatBubble.element.getElementsByClassName(BUBBLE_SECONDARY_BG);
            Array.from(selements).forEach(ele => {
                ele.style.backgroundImage = themeConfig.secondaryColorGradient;
            });

            if (themeConfig.secondaryColorVGradient) {
                selements = kenytChatBubble.element.getElementsByClassName(BUBBLE_SECONDARY_BG_VERTICAL);
                Array.from(selements).forEach(ele => {
                    ele.style.backgroundImage = themeConfig.secondaryColorVGradient;
                });
            }
        }
        else if (themeConfig.secondaryColor) {
            var bgelements = kenytChatBubble.element.getElementsByClassName(BUBBLE_SECONDARY_BG);
            Array.from(bgelements).forEach(ele => {
                ele.style.backgroundColor = themeConfig.secondaryColor;
            });
        }

        if (themeConfig.imageUrl) {
            var imgEle = document.createElement("img");
            imgEle.src = `${rootUrl}${themeConfig.imageUrl}`;
            kenytChatBubble.bubbleContainer.container.appendChild(imgEle);
        }

        if (themeConfig.textColor) {
            var tcelements = kenytChatBubble.element.getElementsByClassName(BUBBLE_TEXT_COLOR);
            Array.from(tcelements).forEach(ele => {
                ele.style.color = themeConfig.textColor;
            });
        }
    }

    function setPopupText(data) {

        if (data) {
            var contentEle = data.markedEle;
            if (!contentEle && data.text) {
                contentEle = "<p>" + data.text + "</p>";
            }

            if (contentEle) {
                removeAllChildNodes(kenytChatBubble.popupContainer.container);
                kenytChatBubble.popupContainer.element.classList.remove("k-hide");
                //kenytChatBubble.channelContainer.element.classList.remove("k-hide");

                kenytChatBubble.popupContainer.element.classList.add("kpopup-holdanimation");
                kenytChatBubble.popupContainer.container.style.minWidth = "75px";
                kenytChatBubble.popupContainer.container.innerHTML = contentEle;

                let maxWidth = 240;
                if (isMobileDevice() &&
                    bubbleStyle === BUBBLE_STYLE_2 &&
                    document.body.clientWidth) {
                    maxWidth = 0.7 * (document.body.clientWidth - 90);
                }

                let popupWidth = kenytChatBubble.popupContainer.container.clientWidth - 90;
                if (popupWidth > maxWidth) {
                    popupWidth = maxWidth;
                }
                kenytChatBubble.popupContainer.container.style.minWidth = popupWidth + "px";
                kenytChatBubble.popupContainer.element.classList.remove("kpopup-holdanimation");

                window.setTimeout(
                    () => {
                        kenytChatBubble.popupContainer.element.classList.add("k-hide");
                        //kenytChatBubble.channelContainer.element.classList.add("k-hide");
                    }, POPUP_CLOSE_AFTER_TIME);
            }
        }
    }

    function getChannelDetails(channelEntry, ipAddress) {
        let channelDetails = {};
        channelDetails.render = true;
        channelEntry.body = channelEntry.body || "hi";
        if (channelEntry && channelEntry.type && channelEntry.number) {

            switch (channelEntry.type) {
                case "sms":
                    if (isMobileDevice()) {
                        var smsdeviceOS = getMobileOperatingSystem();
                        var delimeter = "?";
                        if (smsdeviceOS === "iOS") {
                            delimeter = "&";
                        }
                        channelDetails.link = "sms:" + encodeURIComponent(channelEntry.number) +
                            delimeter + "body=" + encodeURIComponent(channelEntry.body);
                    }
                    channelDetails.id = TEXTBUBBLE_ID;
                    break;
                case "whatsapp":
                    var wadeviceOS = getMobileOperatingSystem();
                    if (wadeviceOS === "iOS") {
                        if (channelEntry.number && channelEntry.number.startsWith('+')) {
                            channelEntry.number = channelEntry.number.substr(1);
                        }
                    }
                    let text = channelEntry.body;
                    if (channelEntry.trackCampaigns) {
                        let contentToEncode = "";
                        if (isMobileDevice()) {
                            contentToEncode = window.location.href;
                        }
                        if (ipAddress) {
                            contentToEncode = ipAddress + " " + contentToEncode;
                        }
                        text = getBase4EncodedUrl(contentToEncode) + channelEntry.body;
                    }
                    channelDetails.link = "https://api.whatsapp.com/send?phone=" +
                        channelEntry.number + "&text=" + text;
                    channelDetails.id = WHATSAPPBUBBLE_ID;
                    break;
                case "facebook":
                    var host = (isMobileDevice()) ? "http://m.me/" : "https://www.messenger.com/t/";
                    channelDetails.link = host + channelEntry.number + "/";
                    channelDetails.id = FACEBOOKBUBBLE_ID;
                    break;
                case "instagram":
                    channelDetails.link = "https://www.instagram.com/" + channelEntry.number + "/";
                    channelDetails.id = INSTAGRMBUBBLE_ID;
                    break;
                case "phone":
                    {
                        channelDetails.link = "tel:" + encodeURIComponent(channelEntry.number);
                    }
                    channelDetails.id = PHONEBUBBLE_ID;
                    break;

                default:
                    channelDetails.render = false;
                    break;
            }
        }

        return channelDetails;
    }

    function getBase4EncodedUrl(url) {
        let base4Encoded = "";

        for (var i = 0; i < url.length; i++) {
            let base4Bits = url.charCodeAt(i).toString(4);
            base4Bits = base4Bits.padStart(4, "0");
            for (var j = 0; j < base4Bits.length; j++) {
                switch (base4Bits.charAt(j)) {
                    case '0':
                        base4Encoded += "%e2%80%8b";
                        break;
                    case '1':
                        base4Encoded += "%e2%80%8c";
                        break;
                    case '2':
                        base4Encoded += "%e2%80%8d";
                        break;
                    default:
                        base4Encoded += "%e2%80%8e";
                        break;
                }
            }
        }
        return base4Encoded;
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    var isWebStorageAvailable = testSessionStorage();

    /**
     * Test whether Session Storage is available and turned on
     */
    function testSessionStorage() {
        var test = '__feature_test';
        try {
            window.sessionStorage.setItem(test, test);
            window.sessionStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    function getDataAttributesFromBotLoaderScript() {
        const dataAttributes = {};

        var botLoaderScriptElement = Array.from(document.scripts).find(
            (script) => script.src.indexOf("bot-loader.js") > -1
        );
        
        // Iterate over all attributes of the element
        for (let i = 0; i < botLoaderScriptElement.attributes.length; i++) {
            const attr = botLoaderScriptElement.attributes[i];
            
            // Check if the attribute starts with 'data-'
            if (attr.name.startsWith('data-')) {
                const key = attr.name;  // Remove 'data-' from the key
                const value = attr.value;
                dataAttributes[key] = value;
            }
        }
        
        return dataAttributes;
    }

    /**
     * Create a iframe for the chat window with the given url 
     * @param {string} iframeSrc 
     * @param {boolean} preventIframeRender
     * @param {string} position
     * @param {boolean} testMode Load chatbot in test mode 
     */
    function createChatWindow(iframeSrc, botType, deviceSettings, preventIframeRender, positionClass, testMode = true, setUserDataForBot = "false", hideChatHistory = false, enablePortal = false, enableHomePortal = false, enableMessagePortal = false, enableMessageFeedback = false) {

        let container = document.createElement("div");
        let iframe = document.createElement("iframe");
        let poweredByContainer = document.createElement("div");
        let poweredBySpan = document.createElement("span");

        container.setAttribute("id", kenytChatWindowContainerId);
        container.classList.add("k-hide");
        //container.style.display = "none";

        let hash = getHash(scriptElement.outerHTML);

        let parentUrl = origin;
        if (isWebStorageAvailable) {
            let kenytSession = window.localStorage.getItem("__kenytsession__");
            if (kenytSession) {
                kenytSession = JSON.parse(kenytSession);
            }

            if (kenytSession && kenytSession.FirstPageQueryPrm) {
                var index = parentUrl.indexOf("?");
                if (index > 0) {
                    var firstPageParams = new URLSearchParams(kenytSession.FirstPageQueryPrm);
                    var firstPageParamsObj = Object.fromEntries(firstPageParams.entries());
                    var currentPageParams = new URLSearchParams(parentUrl.substring(index));
                    var currentPageParamsObj = Object.fromEntries(currentPageParams.entries());

                    // Prioritizing params from current page.
                    for (var attrname in currentPageParamsObj) { firstPageParamsObj[attrname] = currentPageParamsObj[attrname]; }
                    var queryString = Object.keys(firstPageParamsObj).map(key => key + '=' + firstPageParamsObj[key]).join('&');

                    parentUrl = parentUrl.substring(0, index) + "?" + queryString;
                }
                else {
                    parentUrl += "?" + kenytSession.FirstPageQueryPrm;
                }
            }
        }

        parentUrl = encodeURIComponent(parentUrl);
        let srcUrl = `${rootUrl}${iframeSrc}&botid=${botName}&origin=${parentUrl}&enablePortal=${enablePortal}&enableHomePortal=${enableHomePortal}&enableMessagePortal=${enableMessagePortal}&test=${!testMode ? 0 : 1}&hash=${hash}&setuserdataforbot=${setUserDataForBot}&hideChatHistory=${hideChatHistory}&enableMessageFeedback=${enableMessageFeedback}`;
        const botLoaderScriptDataAttributes = getDataAttributesFromBotLoaderScript();
        
        for (const [key, value] of Object.entries(botLoaderScriptDataAttributes)) {
            srcUrl += `&${key}=${value}`;  
        }

        for (var i = 0, atts = scriptElement.attributes, n = atts.length; i < n; i++) {
            var attributeName = atts[i].nodeName;
            if (attributeName.startsWith("context-")) {
                let encodedVal = encodeURIComponent(atts[i].nodeValue);
                srcUrl += `&${attributeName}=${encodedVal}`;
            }
            else if (attributeName.startsWith("user-")) {
                let encodedVal = encodeURIComponent(atts[i].nodeValue);
                srcUrl += `&${attributeName}=${encodedVal}`;
            }
        }

        iframe.setAttribute("src_to_set", srcUrl);
        iframe.setAttribute("id", IFRAME_ID);
        iframe.setAttribute("allow", "geolocation; microphone; camera");
        iframe.allowFullscreen = "allowFullscreen"; // for youtube embeds

        if (botType) {
            container.classList.add(botType);
        }

        if (deviceSettings) {
            var device = isMobileDevice() ? "mobile" : "desktop";
            if (deviceSettings[device]) {
                if (deviceSettings[device]["open Height"]) {
                    container.style.height = deviceSettings[device]["open Height"];
                }
                if (deviceSettings[device]["open Width"]) {
                    container.style.width = deviceSettings[device]["open Width"];
                }
            }
        }

        poweredBySpan.innerHTML = `Powered By <a href="https://www.kenyt.ai" tabindex="-1">Kenyt.AI</a>`;
        poweredByContainer.appendChild(poweredBySpan);
        poweredByContainer.id = 'kenytPoweredBy';

        if (!preventIframeRender) {
            container.appendChild(iframe);
        }
        container.classList.add(positionClass);
        container.appendChild(poweredByContainer);
        return container;
    }

    /**
     * Get value of the script parameter
     * @param {string} paramName
     * 
     * @returns {string} param value corresponding to the param name
     */
    function getScriptParam(paramName) {
        let paramValue = '';
        if (scriptElement) {
            let attribute = `${paramName}`;
            if (scriptElement.hasAttribute(attribute)) {
                paramValue = scriptElement.getAttribute(attribute);
            }
        }
        return paramValue;
    }

    /**
     * Get the API endpoint based on the current environment
     * 
     * @returns {string} The API Endpoint
     */
    function detectEndPoint() {

        if (rootUrl.indexOf("localhost") >= 0) {
            var endpoint = `${rootUrl}${ENDPOINT}`;
            console.debug('Endpoint set to ' + endpoint);
            return endpoint;
        }
        else if (rootUrl.indexOf("ngrok-free.app") > 0) {
            var endPoint = "https://" + window.location.hostname + ENDPOINT;
            console.debug('Endpoint set to ngrok url ' + endPoint);
            return endPoint;
        }
        else {
            let endpoint = `${rootUrl}${PROD_PREFIX}${ENDPOINT}`
            console.debug('Endpoint set to ' + endpoint);
            return endpoint;
        }
    }

    function extractRootUrl() {
        /** @type {string} */
        let source = getScriptParam('src');
        let rootUrl = "";
        if (source) {
            if (source.startsWith("//www.")) {
                source = "https:" + source;
            }
            else if (source.startsWith(".") || source.startsWith("/")) {
                source = window.location.protocol + "//" + window.location.hostname;
                if (window.location.port) {
                    source += `:${window.location.port}`;
                }
            }
            let url = new URL(source);
            rootUrl = url.protocol + "//" + url.hostname;
            if (url.port) {
                rootUrl += `:${url.port}`;
            }
        }
        console.debug('Root URL: ' + rootUrl);
        return rootUrl;
    }

    /**
     * Get the CSS class corresponding to the provided position string
     * @param {string} position 
     * 
     * @returns {string} The CSS class representing the position
     */
    function getPositionClass(position) {
        if (position && typeof position === 'string') {
            position = position.trim().toLowerCase();
            if (position) {
                let keys = Object.keys(positionClasses);
                for (let i = 0; i < keys.length; i++) {
                    if (keys[i] === position) {
                        return positionClasses[keys[i]];
                    }
                }
            }
        }
        return positionClasses.right; // DEFAULT
    }

    function isMobileDevice() {
        return navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i);
    }

    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }

        return "unknown";
    }

    function kenyt_gtag() { dataLayer.push(arguments); }

    function getHash(text) {
        var hash = 0, i, chr;
        for (i = 0; i < text.length; i++) {
            chr = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    /**
    * Get HTML string as a DOM element
    * @param {String} HTML representing a single element
    * @return {Element}
    */
    function htmlToElement(html) {
        html = html.trim();
        var template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstChild;
    }

    function getUnreadMessageCount() {
        var count = kenytChatBubble.element.getAttribute(unreadCountAttribute);
        if (count) {
            count = parseInt(count);
        }
        if (!count) {
            count = 0
        }

        return count;
    }

    function setUnreadMessageCount(value) {
        if (value === 0) {
            clearUnreadMessages();
        }
        else {
            kenytChatBubble.element.setAttribute(unreadCountAttribute, value);
            saveSessionData(UNREAD_COUNT_SESSION_KEY, `${value}`);
        }
    }

    function clearUnreadMessages() {
        unreadMessageCount = 0;
        if (kenytChatBubble.element.hasAttribute(unreadCountAttribute)) {
            kenytChatBubble.element.removeAttribute(unreadCountAttribute);
        }
        saveSessionData(UNREAD_COUNT_SESSION_KEY, `${unreadMessageCount}`);
    }
    /**
     * Save key/value pair in browser's session storage if available
     * @param {string} key
     * @param {string} value
     */
    function saveSessionData(key, value) {
        if (isWebStorageAvailable) {
            window.sessionStorage.setItem(key, value);
        }
    }

    async function saveFirebaseToken() {
        if (firebaseAppConfig) {
            let firebaseApp = await import("https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js");
            let firebaseMessenger = await import("https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging.js");
            if (firebaseApp && firebaseMessenger) {

                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {

                        //const firebaseConfig = {
                        //    apiKey: "AIzaSyARO2wwqWNVe7a6RCxOWwnL8zT2uajw7hg",
                        //    authDomain: "kenytai-a7f31.firebaseapp.com",
                        //    projectId: "kenytai-a7f31",
                        //    storageBucket: "kenytai-a7f31.appspot.com",
                        //    messagingSenderId: "529763972772",
                        //    appId: "1:529763972772:web:08fee6883bd248d2579831"
                        //};

                        const app = firebaseApp.initializeApp(firebaseAppConfig);
                        const messaging = firebaseMessenger.getMessaging(app);
                        //var token = await firebaseMessenger.getToken(messaging);
                        //alert(token);
                        firebaseMessenger
                            .getToken(messaging)
                            .then((currentToken) => {
                                if (currentToken) {
                                    alert(currentToken);
                                    if (kenytChatBubbleJs && kenytChatBubbleJs.notifyChatWindow) {
                                        kenytChatBubbleJs.notifyChatWindow(iframeEventType.FirebaseToken, currentToken);
                                    }
                                }
                            })
                    }
                });
            }
        }
    }

})();