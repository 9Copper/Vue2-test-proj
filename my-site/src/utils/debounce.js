export default function(fn,duration = 160) {
    let timer = null;
    return (...data) => {
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn(...data);
        },duration)
    }
}