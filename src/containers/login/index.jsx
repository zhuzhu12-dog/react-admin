import React, { Component } from 'react'
import { Form, Input, Button, Icon,  } from "antd";
import { connect } from "react-redux";
import { getUserAsync } from "../../redux/action-creators/user";
import{ setItem } from "../../utils/storage";
import withCheckLogin from '../with-check-login';
import logo from "../../assets/logo.png";
import "./index.less";
const { Item } = Form;
@withCheckLogin
@connect(null, {getUserAsync})
@Form.create()
class Login extends Component {
    validator = (rule, value, callback) => {
        const name = rule.field === "username" ? "用户名" : "密码";
       if(!value){
           callback("请输入" + name);
       }else if (value.length < 4) {
           callback(name + "至少大于四位");
       }else if (value.length > 10) {
           callback(name + "不少于10十位");
       }else if(/\w/.test(value)) {
           callback(name + "只能包含英文,数字和字母")
       }else{
        callback();
       }
    };
    login = e => {
        e.preventDefault();
        const{ form } = this.props;
        form.validateFields((err, values) => {
            if(!err){
                const { username, password } = values;
                this.props
                .getUserAsync(username, password)
                .then(response =>{
                    setItem("user", response);
                    this.props.history.push("/")
                })
                .catch(err => {
                    form.resetFields(["passwords"]);
                });
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-section">
                <Form onSubmit={this.login}>
                    <h3>用户登录</h3>
                       <Item>
                           {getFieldDecorator("username", {
                                rules:[
                                 { required: true, 
                                    message: 'Please input your username!'
                                 },
                                 {
                                     min: 4,
                                     message: "至少大于四位"
                                 },
                                 {
                                     max: 10,
                                     message: "不少于10十位"
                                 },
                                 {
                                     pattern: /\w/,
                                     message:"只能包含英文,数字和字母"
                                 },
                             ]
                            }
                           )(
                           <Input
                           prefix={
                               <Icon type="user"  className="login-icon"/>
                           }
                           placeholder="用户名"
                           />
                           )}
                       </Item>
                       <Item>
                           {getFieldDecorator(
                               "password",
                               {
                                   rules:[
                                       {required: true,  message: 'Please input your Password!' }
                                   ]
                               }
                           )(
                           <Input 
                           prefix={
                             <Icon type="lock" className="login-icon"/>}
                             type="password"
                           placeholder="密码"
                           />
                           )}
                       </Item>
                       <Item>
                       <Button type="primary" block className="login-btn" htmlType="submit"> 
                       Primary
                       </Button>
                       </Item>
                   </Form>
                </section>
            </div>
        );
    }
}
export default (Login);