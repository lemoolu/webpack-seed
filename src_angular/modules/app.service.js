import app from 'app.config';
import moment from 'moment';

app.service('appService', function($rootScope, request) {
  // 登陆校验
  this.checkLogin = function(successCall, faildCall) {
    let isLogin = true;
    setTimeout(() => {
      if (isLogin) {
        successCall && successCall();
      } else {
        faildCall && faildCall();
      }
    });
  };

  // 时间选择插件配置
  this.dataRangePickerOpt = {
    opens: 'right',
    timePicker: true,
    timePicker24Hour: true,
    ranges: {
      '今天': [moment().hour(0).minute(0), moment()],
      '昨天': [moment().subtract(1, 'days').hour(0).minute(0), moment().subtract(1, 'days').hour(23).minute(59)],
      '最近7天': [moment().subtract(6, 'days').hour(0).minute(0), moment()],
      '最近30天': [moment().subtract(29, 'days').hour(0).minute(0), moment()],
      '本月': [moment().startOf('month'), moment().endOf('month')],
      '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    locale: {
      format: 'YYYY-MM-DD HH:mm',
      applyLabel: '确定',
      cancelLabel: '取消',
      customRangeLabel: '自定义',
      daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    }
  };
  // 常量定义
  this.constUpdate = function(type) {
    if (type === 'group') {
      request('accountGroupList').success((res) => {
        $rootScope.const.group = [];
        for (let item of res.rsm.info) {
          $rootScope.const.group.push({
            id: item.id, // 后台id无效
            name: item.title
          });
        }
        // $rootScope.const.group.push({ id: '', name: '其他' });
      });
    }
  };
  this.constUpdate('group');
  $rootScope.dataRangePickerOpt = this.dataRangePickerOpt;
  $rootScope.const = {
    group: [ // 角色
    ],
    teacherStar: [ // 教师星级
      { id: 0, name: '全部' },
      { id: 4, name: '4-5星' },
      { id: 3, name: '3-4星' },
      { id: 2, name: '2-3星' },
      { id: 1, name: '1-2星' },
    ],
    applyStatus: [ // 资质审核状态
      { id: 0, name: '全部' },
      { id: 1, name: '未提交' },
      { id: 2, name: '待审核' },
      { id: 3, name: '审核通过' },
      { id: 4, name: '审核拒绝' },
    ],
    inviteStatus: [ // 邀请状态
      { id: 0, name: '全部' },
      { id: 1, name: '是' },
      { id: 2, name: '否' }
    ],
    customerService: [ // 客服列表
      { id: 0, name: '所有客服' }
    ],
    starApplyStatus: [ // 星级审核状态
      { id: 0, name: '全部' },
      { id: 1, name: '待审核' },
      { id: 2, name: '升星' },
      { id: 3, name: '降星' },
    ],
    realNameCertStatus: [ // 实名认证状态
      { id: 0, name: '全部' },
      { id: 1, name: '是' },
      { id: 2, name: '否' },
    ],
    serviceGroup: [ // 服务人群
      { id: 0, name: '全部' },
      { id: 1, name: '学生' },
      { id: 2, name: '老师' },
    ],
    sex: [
      { id: 1, name: '男' },
      { id: 2, name: '女' },
    ],
    courseType: [ // 课程模式
      { id: 0, name: '全部' },
      { id: 1, name: '线上课' },
      { id: 2, name: '线下课' },
    ],
    courseStatus: [
      { id: 0, name: '全部' },
      { id: 1, name: '待审核' },
      { id: 2, name: '审核通过' },
      { id: 3, name: '审核拒绝' },
      { id: 4, name: '待开课' },
      { id: 5, name: '进行中' },
      { id: 6, name: '已完成' },
      { id: 7, name: '异常' }
    ],
    bannerTypeList: [ // banner类型
      { id: 0, name: '全部' },
      { id: 1, name: '发现广告页' },
      { id: 2, name: 'web广告' },
    ],
    orderStatus: [
      { id: 0, name: '全部' },
      { id: 1, name: '未支付' },
      { id: 2, name: '已支付' },
      { id: 3, name: '支付超时' },
    ],
    orderCourseStatus: [
      { id: 0, name: '全部' },
      { id: 1, name: '未支付' },
      { id: 2, name: '已支付' },
      { id: 3, name: '已完成' },
      { id: 4, name: '待退款' },
      { id: 5, name: '已退款' },
    ],
  };
});
