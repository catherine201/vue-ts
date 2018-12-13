export function findKeyframesRule(animName) { 
    var rule; var ss = document.styleSheets; 
    for (var i = 0; i < ss.length; ++i) { 
        for (var x = 0; x < ss[i].cssRules.length; ++x) { 
            rule = ss[i].cssRules[x]; 
            if (rule.name == animName && (rule.type== CSSRule.KEYFRAMES_RULE || ss[i].cssRules[j].type == CSSRule.WEBKIT_KEYFRAMES_RULE ))
            { return rule; // 可改为 console 查看当前页中所有动画属性值 
            } } } } 
export function change(selector, animName, rule) { 
    var keyframes = findKeyframesRule(animName); 
    // 删除已经存在的开始和结束帧 
    keyframes.deleteRule("0%"); 
    keyframes.deleteRule("100%"); 
    //此处为举例 
    keyframes.insertRule(rule); 
    //结束移动屏幕一半 
    // 重新指定动画名字使之生效 
    // document.querySelector(selector).style.webkitAnimationName = animName;
    this.$refs[selector].style.webkitAnimationName = animName; }
