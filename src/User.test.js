import User from './User'
import {findByTestAttr} from '../testUtils'
import {shallow} from 'enzyme'
import axios from 'axios'

jest.mock("axios");
describe("User component initial rendering",()=>{
    let wrapper;
    let props = {
        component : "dummy"
    }
    beforeEach(()=>{
        wrapper = shallow(<User {...props}/>)
    })
    test("testing props",()=>{
        expect(wrapper.instance().props).toStrictEqual(props)
    })
    test("should display heading",()=>{
        let headingElement = findByTestAttr(wrapper,'user_heading')
        expect(headingElement.text()).toBe(props.component)
    })
    test("should display input element",()=>{
        let inputElement = findByTestAttr(wrapper,'user_input')
        expect(inputElement.length).toBe(1)
    })
    test("should display button element",()=>{
        let buttonElement = findByTestAttr(wrapper,'user_button')
        expect(buttonElement.length).toBe(1)
        expect(buttonElement.text()).toBe('View User Details')
    })
    test("should not display user result",()=>{
        let resultElement = findByTestAttr(wrapper,'user_result')
        expect(resultElement.length).toBe(0)
    })
    test("should not display error message",()=>{
        let errorElement = findByTestAttr(wrapper,'user_errMsg')
        expect(errorElement.length).toBe(0)
    })
})

describe("user interactions", ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<User/>)
    })
    test("username should be updated when typing on input element", ()=>{
        let inputElement = findByTestAttr(wrapper,'user_input')
        inputElement.simulate('change',{target:{value:"user"}});
        wrapper.update();
        expect(wrapper.state('username')).toBe('user')
    })
    test("When button clicks getUserDetails method should be called", ()=>{
        let buttonElement = findByTestAttr(wrapper,'user_button')
        const spyOngetUserDetails = jest.spyOn(wrapper.instance(),'getUserDetails')
        buttonElement.simulate('click');
        wrapper.update();
        expect(spyOngetUserDetails).toBeCalledTimes(1)
    })
    test("axios call should be happened inside getUserDetails method", async()=>{
        let successData = {
            data : {
                name : "User"
            }
        }
        
        axios.get.mockImplementation(()=>Promise.resolve(successData))
        await wrapper.instance().getUserDetails();
        wrapper.update()
        expect(wrapper.state('result')).toStrictEqual(successData.data)
        let resultElement = findByTestAttr(wrapper,'user_result')
        expect(resultElement.length).toBe(1)
    })
    test("failed axios call should return error message inside getUserDetails method",async ()=>{
        let errorData = {
            data : {
                message : "Error"
            },
        }
        axios.get.mockImplementation(()=>Promise.reject(errorData))
        await wrapper.instance().getUserDetails()
        wrapper.update()
        expect(wrapper.state('errMsg')).toStrictEqual(errorData.data.message)



    })
})