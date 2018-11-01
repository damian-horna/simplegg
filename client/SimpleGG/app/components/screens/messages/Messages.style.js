export default {
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    innerContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    textArea: {
        flex: 1,
        marginTop: 14,
        height: 100,
        marginHorizontal: 30
    },
    titleText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#5db3dd',
        fontSize: 30,
        marginBottom: 30
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        lineHeight: 25
    },
    transactionTitle: {
        flex: 2,
        color: 'white',
        marginLeft: 10,
        fontSize: 13,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 15,
        marginTop: 25
    },

    contact: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        backgroundColor: '#444444',
        paddingVertical: 15,
        marginVertical: 5
    },
    'contact:first-child': {
        marginTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    'contact:last-child': {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    contactWrapper: {
        backgroundColor: '#333333',
        bottom: 0,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
}
