for (img of document.getElementsByTagName('img')) {
  var x = findWidth(img);
  var y = findHeight(img);
  if (x == 0 || y == 0) {
    continue;
  }
  if (img.src) {
    img.src = getCat(x, y);
  }
  if (img.srcset) {
    var slope = x / y;
    var images = img.srcset.split(",");
    var srcset = "";
    for (url of images) {
      var width = url.trim().split(" ")[1].replace(/[^0-9]/g, "");
      var height = Math.round(width / slope);
      srcset += getCat(width, height) + " " + width + "w,";
    }
    img.srcset = srcset;
  }

  if (img.dataset.defaultSrc) {
    img.dataset.defaultSrc = getCat(x, y);
  }
}

for (img of document.getElementsByTagName('div')) {
  if (img.style && img.style.backgroundImage) {
    var x = findWidth(img);
    var y = findHeight(img);
    if (x == 0 || y == 0) {
      continue;
    }
    img.style.backgroundImage = "url(\"" + getCat(x, y) + "\")";
  }
}

for (img of document.getElementsByTagName('source')) {
  var x = findWidth(img);
  var y = findHeight(img);
  if (x == 0 || y == 0) {
    continue;
  }
  if (img.src) {
    img.src = getCat(x, y);
  }
  if (img.srcset) {
    var slope = x / y;
    var images = img.srcset.split(",");
    var srcset = "";
    for (url of images) {
      var parts = url.trim().split(" ");
      var width;
      if (parts > 1 && parts[1].replace(/[^0-9]/g, "")) {
        width = parts[1].replace(/[^0-9]/g, "");
      } else {
        if (srcset) {
          continue;
        }
        width = x;
      }
      var height = Math.round(width / slope);
      srcset += getCat(width, height) + " " + width + "w,";
    }
    img.srcset = srcset;
  }

  if (img.dataset.defaultSrc) {
    img.dataset.defaultSrc = getCat(x, y);
  }
}

function findWidth(img) {
  for (var i = 0; i < 6; i++) {
    if (img.width && img.width != 0) {
      return img.width;
    }
    if (img.clientWidth && img.clientWidth != 0) {
      return img.clientWidth;
    }
    if (img.offsetWidth && img.offsetWidth != 0) {
      return img.offsetWidth;
    }
    if (img.scrollWidth && img.scrollWidth != 0) {
      return img.scrollWidth;
    }
    img = img.parentElement;
  }
  return 0;
}

function findHeight(img) {
  for (var i = 0; i < 6; i++) {
    if (img.height && img.height != 0) {
      return img.height;
    }
    if (img.clientHeight && img.clientHeight != 0) {
      return img.clientHeight;
    }
    if (img.offsetHeight && img.offsetHeight != 0) {
      return img.offsetHeight;
    }
    if (img.scrollHeight && img.scrollHeight != 0) {
      return img.scrollHeight;
    }
    img = img.parentElement;
  }
  return 0;
}
// url(https://cdn.ussoccer.com/-/jssmedia/project/ussf/teams/us-mnt/featuredcontent01.ashx?rev=b70c1a2be2914a298e12821405b41eed?mw=800)

function getCat(x, y) {
  return "https://placekitten.com/" + x + "/" + y;
}
//
//
// <img alt="" width="" height=""
// sizes="(min-width: 768px) 2560px, 768px"
// srcset="https://cdn.ussoccer.com/-/jssmedia/project/ussf/images/mnt/usmnt-p1/ussf_mens23_squadwebsite1920x1080_2.ashx?mw=2560&amp;rev=303a770e488a4a2295a9baa380fbcc2d 2560w,
// https://cdn.ussoccer.com/-/jssmedia/project/ussf/images/mnt/usmnt-p1/ussf_mens23_squadwebsite1920x1080_2.ashx?mw=768&amp;rev=303a770e488a4a2295a9baa380fbcc2d 768w"
// src="https://placekitten.com/1777/744">
