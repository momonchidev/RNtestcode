import moment from 'moment';
import React, {useState} from 'react';
import { View,Text } from 'react-native';
import DateTimePickerModal from '@react-native-community/datetimepicker';

function DatePickerInput(props) {
    const { handleSubmit, values, setFieldValue } = props;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        setFieldValue('myDate', moment(date).format('yyyyMMdd'))
        hideDatePicker();
    };

    return (
        <View>
        <Text onPress={showDatePicker}>{moment(values.myDate).format('yyyyMMdd')}</Text>
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            date={moment(values.myDate).toDate()}
        />
        </View>
    );
}

export default DatePickerInput;