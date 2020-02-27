export default() => {//st页面this对象,stateFlag获取的字段
  let HdRules= {
    'text':[
      {required:true, message: '请输入内容', trigger: 'blur,change'},
      {min: 2, max: 16, message: '长度在 2 到 16 个字符'},
      {pattern:/^[a-zA-Z]\w{1,15}$/, message: '以字母开头，长度在2-16之间， 只能包含字符、数字和下划线'}
    ],
    'number':[
      {type:'number',required: true, message: '请输入整数', trigger: 'blur,change'},
      {pattern: /(^-?\\d+$)/, message: '请输入整数'}
    ],
    'number_float':[
      {type:'number',required: true, message: '请输入数字', trigger: 'blur,change'},
      {pattern: /(^(-?\\d+)(\\.\\d+)?$)/, message: '请输入数字'}
    ],
    'number_4_2':[
      {type:'number',required: true, message: '请输入整数4位，小数2位', trigger: 'blur,change'},
      {pattern: /(^\d{1,4}(\.\d{1,2})?$)/, message: '请输入整数4位，小数2位'}
    ],
    'number_3_2':[
      {type:'number',required: true, message: '请输入整数3位，小数2位', trigger: 'blur,change'},
      {pattern: /(^\d{1,3}(\.\d{1,2})?$)/, message: '请输入整数3位，小数2位'}
    ],
    'number_2_2':[
      {type:'number',required: true, message: '请输入整数2位，小数2位', trigger: 'blur,change'},
      {pattern: /(^\d{1,2}(\.\d{1,2})?$)/, message: '请输入整数2位，小数2位'}
    ],
    'text_no':[
      {required:false, message: '请输入内容', trigger: 'blur,change'},
      {min: 2, max: 16, message: '长度在 2 到 16 个字符'},
      {pattern:/^[a-zA-Z]\w{1,15}$/, message: '以字母开头，长度在2-16之间， 只能包含字符、数字和下划线'}
    ],

    'number_no':[
      {type:'number',required: false, message: '请输入整数', trigger: 'blur,change'},
      {pattern: /(^-?\\d+$)/, message: '请输入整数'}
    ],
    'number_float_no':[
      {type:'number',required: false, message: '请输入数字', trigger: 'blur,change'},
      {pattern: /(^(-?\\d+)(\\.\\d+)?$)/, message: '请输入数字'}
    ],
    'number_4_2_no':[
      {type:'number',required: false, message: '请输入整数4位，小数2位', trigger: 'blur,change'},
      {pattern: /(^\d{1,4}(\.\d{1,2})?$)/, message: '请输入整数4位，小数2位'}
    ],
    'number_3_2_no':[
      {type:'number',required: false, message: '请输入整数3位，小数2位', trigger: 'blur,change'},
      {pattern: /(^\d{1,3}(\.\d{1,2})?$)/, message: '请输入整数3位，小数2位'}
    ],
    'number_2_2_no':[
      {type:'number',required: false, message: '请输入整数2位，小数2位', trigger: 'blur,change'},
      {pattern: /(^\d{1,2}(\.\d{1,2})?$)/, message: '请输入整数2位，小数2位'}
    ]
  }
  return HdRules;
}
