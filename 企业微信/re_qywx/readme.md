## 企业微信 cst逆向

![捕获](C:\Users\24657\Desktop\re_qywx\捕获.PNG)

java层追踪到native cst

c层看在libwework_framework.so里 sub_1911648里实现加密 aes加密  iv是rand() 

![捕获1](C:\Users\24657\Desktop\re_qywx\捕获1.PNG)

cst是前面16位的iv和 aes加密的结果

问题是sk2是怎么获取的

起始登入调用了0x1D49404  0x1959554