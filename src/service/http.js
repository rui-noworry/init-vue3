import axios from 'axios'
import store from '@/store'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'

axios.interceptors.request.use(
  config => {
    // const token = decodeURIComponent(decodeURI('bf0152240b4d16e269902b1c633fcc96130f3a4f7924f737d83ac28556488e0f'))
    const token = store.getters.token
    config.headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Token': token,
      'request-id': ''
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)
axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    const token = store.getters.token
    if (error && error.response && error.response.status === 401) { //未登录
      // let href = process.env.GIC_URL
      // let loginurl = error.response.data.data.sso_url + href
      //window.location.href = loginurl
      const loginurl = window.location.origin
      window.location.href = loginurl
    } else if (error && error.response && error.response.status === 403) { //无权限
      ElMessageBox.confirm('您需要开启权限,您可以直接联系销售或者拨打我们的客服电话：400-810-7006。', '提示', {
        confirmButtonText: '返回首页',
        showCancelButton: false,
        showClose: false,
        closeOnClickModal: false,
        type: 'warning'
      }).then(() => {
        const url = window.location.origin
        window.location.href = url
      }).catch(() => {
      })
    }
    console.log(error.response.data)
    return Promise.reject(error.response.data)
  }
)

export let http = {
  baseUrl: "",
  request:function(_method, _url, _reqdata, _noLoadStatus){
    _reqdata = _reqdata || {};
    var config = {
      method: _method,
      url: _url,
      baseURL:this.baseUrl,
      withCredentials: true,
      timeout: 30000,
    };

    if(/^http[s]?:\/\//.test(_url)){
      config.baseURL = '';
    }

    switch(_method.toLowerCase()){
      case 'get':
        config.params = _reqdata;
        break;
      case 'post':
      case 'put':
      case 'patch':
        config.data = _reqdata;
        break;
      default:
        break;
    }

    var loadEntity = {
        lock: true,
        text: '请稍后，正在处理中.....',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)',
        customClass:"loading"
    };
    var loading = null,
        setTime = null,
        loading_status = !!_noLoadStatus,
        loading_number = 0;

    if(!loading_status){
      setTime = setTimeout(function(){
        loading = ElLoading.service(loadEntity);
        loading_status = true;
      },200);
    }
    loading_number = 1;

    return new Promise(function(resolve, reject){
      axios(config).then(function(resData){
        loading_number = 0;
        clearTimeout(setTime);

        if(!!loading && loading_number == 0){
          loading.close();
          loading_status = false;
          var myloads = document.getElementsByClassName('el-loading-mask');
          if(myloads && myloads.length > 0){
            for(var c = 0; c < myloads.length; c++){
              let myNode = myloads[c];
              myNode.parentNode.removeChild(myNode);
            }
          }
        }

        var StatusCode = resData.code;

        if(!(StatusCode == 'success' || StatusCode == 200)){
          ElMessage.error({
            message:resData.msg,
            type:"error",
            duration:5000
          });
        }
        resolve(resData);
      }).catch(function(error){
        loading_number = 0;
        clearTimeout(setTime);
        if(!!loading && loading_number == 0){
          loading.close();
          loading_status = false;
          var myloads = document.getElementsByClassName('el-loading-mask');
          if(myloads && myloads.length > 0){
            for(var c = 0; c < myloads.length; c++){
              let myNode = myloads[c];
              myNode.parentNode.removeChild(myNode);
            }
          }
        }
        ElMessage({
          message:error.msg,
          type:"error",
          duration:5000
        });

        reject(error);
      });
    });
  },
  get:function(url,reqdata,noLoadStatus){
    return this.request('get',url,reqdata,noLoadStatus);
  },
  post:function(url,reqdata,noLoadStatus){
    return this.request('post',url,reqdata,noLoadStatus);
  },
}
