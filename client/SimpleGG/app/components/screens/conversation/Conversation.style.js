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
    msgContainer: {
        display: 'flex',
        flexDirection: 'row',
        minWidth: '100%',
        backgroundColor: '#333333',
        borderTopColor: '#5db3dd',
        borderTopWidth: 1
    },
    textInput: {
        flex: 1,
        backgroundColor: '#ffffff',
        height: 40,
        margin: 10,
        borderRadius: 5,
        padding: 3
    },
    button: {
        flexShrink: 0,
        width: 40,
        height: 40,
        marginTop: 10,
        marginRight: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent:'center'
    },
    flatlistContainerStyle: {
        flexGrow: 1,
        justifyContent: 'center'
    },
    listContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#333333'
    },
    placeholder: {
        fontSize: 16,
        color: 'grey',
        textAlign: 'center'
    },
    bubbleView: {
        backgroundColor: '#5db3dd',
        flex: 1,
        borderRadius: 8,
        padding:8
    },
    userText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    messageText: {
        flex: 1,
        color: 'white',
        fontSize: 16
    },
    messageRowContainer: {
        flex: 1,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333333',
        borderRadius: 5
    },
}
