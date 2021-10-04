import React,{useState} from 'react';
import renderer from 'react-test-renderer';
import { Platform,FlatList } from 'react-native';
import MainScreen from '../screen/MainScreen';
import { Provider } from 'react-redux';
import store from './../store/store';
import Enzyme,{ shallow } from 'enzyme';
import CustomersList from '../component/CustomersList';
import CustomerItemView from '../component/CustomerItemView';
import Adapter from 'enzyme-adapter-react-16';




jest.useFakeTimers()
//test jest
test('it works', () => {
    expect(true).toBeTruthy();
});

//test if platform is available
if (Platform.OS !== 'web') {
        console.log(`Everything is great! 😁`)
} else {
    throw new Error(`Oppps! 😭`);
}

//test provider redux is working
test('renders correctly', () => {
    const tree = renderer.create(<Provider store={store}><MainScreen /></Provider>).toJSON();
    expect(tree).toMatchSnapshot();
});


const mockItem = {
        id: "xxxxx-4xxx-yxxx",
        firstName:"John",
        lastName:"Doe",
        dob:"01101010",
        phone:"012039210",
        address:"Manila"
  }

  const mockItemList = [{
    id: "xxxxx-4xxx-yxxx",
    firstName:"John",
    lastName:"Doe",
    dob:"01101010",
    phone:"012039210",
    address:"Manila"
}]

Enzyme.configure({adapter: new Adapter()});
describe("<CustomersList />", () => {
    
    const myInitialState = []

    React.useState = jest.fn().mockReturnValue([myInitialState, {}])
    let wrapper
    beforeEach(() => {
      wrapper = shallow(<Provider store={store}><CustomersList /></Provider>)
    })
    const stateSetter = jest.fn()
    const customers = [
      {
        id: "xxxxx-4xxx-yxxx",
        firstName:"John",
        lastName:"Doe",
        dob:"01101010",
        phone:"012039210",
        address:"Manila"
      }
    ]
    
    describe("the <FlatList />", () => {
  
    it("looks to customers in the state for data", () => {
      //wrapper.setState({customers: mockData})



    //   wrapper.useState([customers,stateSetter])
      const flatList = wrapper.find(FlatList)
  
      expect(flatList.props().data).toEqual(customers)
    })
  
    it("its children are <CustomerItemView />s, and it passes to an <CustomerItemView /> an item in the data as a prop", () => {
      wrapper.setState({customers: mockItemData})
      const flatList = wrapper.find(FlatList)
  
      const itemElement = flatList.props().renderItem({item: flatList.props().data[0]})
  
      expect(itemElement.type).toEqual(CustomerItemView)
      expect(itemElement.props.item).toEqual(mockItemData[0])
    })
  
  })
})