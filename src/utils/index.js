const format = (timestamp) => {
	const dt = new Date(timestamp);
	
    const date=`${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`; //日期

    const h=dt.getHours();   
    const m=dt.getMinutes()<10 ? `0${dt.getMinutes()}` : dt.getMinutes();
    const s=dt.getSeconds()<10 ? `0${dt.getSeconds()}` : dt.getSeconds();

    const time=`${h}:${m}:${s}`; //时间

    return {date,time};
};

const search = (search) => {
    var regExp = /([^&=]+)=([\w\W]*?)(&|$)/g;
    var obj = {};
    var result;
    while ((result = regExp.exec(search)) !== null) {
        obj[result[1]] = result[2];
    }
    return obj;
};

export default {
    format,
    search
};