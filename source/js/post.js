var deviceWidthFlag = 600;//判断是否是移动端
var post_toc = document.getElementById('post_toc');
PostToc();

function PostToc() {
    if (post_toc != null) {
        if (document.body.clientWidth < deviceWidthFlag) {
            if (!post_toc.classList.contains("post_toc--hidden")) {
                post_toc.classList.add("post_toc--hidden");
            }
        } else if (post_toc.classList.contains("post_toc--hidden"))
            post_toc.classList.remove("post_toc--hidden");

        let tocLinks = post_toc.getElementsByTagName('A');
        for (let i = 0; i < tocLinks.length; i++) {
            let target = tocLinks[i].getAttribute('href');
            tocLinks[i].setAttribute('link', target);
            tocLinks[i].setAttribute('href', 'javascript:void(0)');

            tocLinks[i].addEventListener('click', function () {
                let link = tocLinks[i].getAttribute('link');
                let targetElement = document.getElementById(decodeURI(link.substring(1)));
                tocLinks[i].removeAttribute('href');
                let targetElementTop = targetElement.offsetTop;
                window.scrollTo({
                    top: targetElementTop,
                    behavior: 'smooth'
                });
            });
        }
    }
}

window.removeEventListener('scroll', BodyScroll);
window.addEventListener('scroll', BodyScroll);

function removeClass(obj, cls) {
    if (obj.className === cls) {
        obj.className = "";
    }
}

function addClass(obj, cls) {
    if (obj.className !== cls) {
        obj.className = cls;
    }
}

function BodyScroll() {
    if (post_toc == null) {
        return;
    }
    let pos = document.documentElement.scrollTop;
    let tocLinks = post_toc.getElementsByTagName('A');
    let content = document.getElementsByClassName("content")
    if (content == null || content.length === 0)return;
    let items = content[0].querySelectorAll(".headerlink");
    let currentId = "";

    for (let i = 0; i < items.length; i++) {
        let _item = items[i];
        let _itemTop = _item.offsetTop;
        if (pos > _itemTop - 100) {
            currentId = _item.href.split("#")[1];
        } else {
            break;
        }
    }
    if (currentId) {
        for (let j = 0; j < tocLinks.length; j++) {
            let _menu = tocLinks[j];
            if (_menu == null) {
                continue;
            }
            let attribute = _menu.getAttribute("link");
            if (attribute == null) {
                continue;
            }
            let _href = attribute.split("#")[1];
            if (_href !== currentId) {
                removeClass(_menu, "cur");
            } else {
                addClass(_menu, "cur");
            }
        }
    }
}

function bookmark() {
    if (post_toc == null) return;
    if (post_toc.classList.contains("post_toc--hidden")) {
        post_toc.classList.remove("post_toc--hidden");
    } else {
        post_toc.classList.add("post_toc--hidden");
    }
}

document.body.onclick = function (e) {
    if (post_toc == null) {
        return;
    }
    if (document.body.clientWidth > deviceWidthFlag) {
        return;
    }
    let elements = document.elementsFromPoint(e.clientX, e.clientY);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].id === "bookmark" || elements[i].tagName === "A") {
            return;
        }
    }

    if (!post_toc.classList.contains("post_toc--hidden")) {
        post_toc.classList.add("post_toc--hidden");
    }
}