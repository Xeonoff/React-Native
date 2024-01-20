import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Filter({ search, setSearch, send }) {
    const handleSend = () => {
        send((prev_count) => prev_count + 1)
    }

    return (
        <View style={styles.page}>
            <Text style={styles.filter_title}>Фильтр</Text>
            <View style={styles.filter}>
                <View>
                    <Text style={styles.column_title}>Имя</Text>
                    <TextInput style={styles.input}
                        autoComplete="off"
                        placeholder="начните вводить имя"
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                </View>
            </View>
            <Button title="применить" onPress={() => handleSend()} />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
    },
    filter_title: {
        marginTop: 10,
        fontSize: 22,
        textAlign: 'center',
    },
    filter: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        padding: 5,
        borderColor: '#d8d8d8',
        borderWidth: 1,
        marginBottom: 10,
    },
    column_title: {
        marginBottom: 10,
        fontSize: 18,
    },
    input: {
        position: 'relative',
        top: -7,
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 2,
        paddingRight: 200,
        borderColor: '#d8d8d8',
        borderWidth: 1,
        borderRadius: 5,
    }
});