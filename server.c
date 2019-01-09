#include <sys/types.h>
#include <sys/wait.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <netdb.h>
#include <signal.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <pthread.h>
#include <ctype.h>


#define SERVER_PORT 1235
#define QUEUE_SIZE 5


int userId=100;
int msgId=0;
typedef struct message
{
    int from;
    int whom;
    char mes[2000];
} message;

struct message messages[2000] = {{0,0,""}};
typedef struct client
{
    int des;
    int id;
    char name[50];
    pthread_mutex_t client_mutex ;
} client ;


struct client clients[50] = {{0,0,""}};

int findIndex(int dest)
{
    int k=0;
    while(1)
    {
        if(clients[k].des== dest) break;
        if(k> 50) return 0;
        k++;
    }

    return k;
}

int findDesc(int numb)
{
    int z=0;
    while(1)
    {
        if(clients[z].id==numb) break;
        if(z> 50) return 0;
        z++;
    }

    return clients[z].des;
}


int whiteSpaceIndex(char *ch,int i)
{
    int k =0;
    int n=0;
    while(1)
    {
        if(isspace(ch[k])) n++;
        if(n>=i) break;
        k++;
    }
    return k;

}

char* concatenate(char* a, char* b)
{
    char* result;

    result = malloc(strlen(a) + strlen(b) + 1);
    strcpy(result,a);
    strcat(result,b);
    return result;
}

int extractDes(char s[],int k,int l)
{
    char buf2[20];
    memset(buf2,0,20);
    int n=whiteSpaceIndex(s,k);
    int w=whiteSpaceIndex(s,l);
    strncpy(buf2,& s[n+1],w-n);

    return atoi(buf2);
}
pthread_mutex_t msgId_mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_mutex_t userId_mutex = PTHREAD_MUTEX_INITIALIZER;


void contact(int dest,char s[],int myIndex)
{
    int sentBytes = 0;
    int allBytes = 0;
    strcpy(clients[myIndex].name,& s[2]);
    printf("%s\n",s);
    pthread_mutex_lock(& userId_mutex);
    userId++;
    clients[myIndex].id=userId;
    char* msgType = "r ";
    char userIdStr[5];
    memset(userIdStr,0,5);
    sprintf( userIdStr,"%d",userId);
    pthread_mutex_unlock(& userId_mutex);
    char* msg = NULL;
    msg = concatenate(msgType, userIdStr);
    msgType=NULL;
    int err;
    pthread_mutex_lock(& clients[myIndex].client_mutex);
    allBytes = strlen(msg);
        while(allBytes != sentBytes){
            err = write(dest,msg+sentBytes,strlen(msg)-sentBytes);
            if(err<0){
                printf("Error");
                break;
            } else {
		sentBytes = sentBytes + err;
	    }
        }
    pthread_mutex_unlock(& clients[myIndex].client_mutex);
    msg=NULL;
    memset(userIdStr,0,5);
    free(msg);
}

void showContacts(int des,int index)
{
    int sentBytes = 0;
    int allBytes = 0;
    char* separator = ",";
    char* message="c";
    for(int j=0; j< 50; j++)
    {
        if(clients[j].id!=0)
        {
            char userIdStr[3];
            memset(userIdStr,0,3);
            sprintf( userIdStr,"%d",clients[j].id);
            char* sid= concatenate(separator,userIdStr);
            char* msg2 = concatenate(sid,separator);
            char* msg3 =concatenate(msg2,clients[j].name);
            
	    message = concatenate(message,msg3);
            
        }
    }
    pthread_mutex_lock(& clients[index].client_mutex);
    int err;
    allBytes = strlen(message);
	while(allBytes != sentBytes){
	    err = write(des,message+sentBytes,strlen(message)-sentBytes);
	    if(err<0){
		printf("Error");
		break;
	    } else {
		sentBytes = sentBytes + err;
	    }
	}
    free(message);
    pthread_mutex_unlock(& clients[index].client_mutex);
}
void saveMsg(char s[],int a,int b,int index)
{


    pthread_mutex_lock(& msgId_mutex);
    messages[msgId].from = a;
    messages[msgId].whom =b;
    strcpy(messages[msgId].mes,& s[index+1]);
    msgId++;
    pthread_mutex_unlock(& msgId_mutex);


}
void sendMsg(char s[])
{
    int sentBytes = 0;
    int allBytes = 0;
    char* msgType4="d ";
    char idStr[5];
    int odd = extractDes(s,1,2);
    int doo = extractDes(s,2,3);
    int normal= whiteSpaceIndex(s,3);
    sprintf(idStr,"%d",odd);
    int desc=findIndex(doo);
    if(findDesc(doo)!=0 && findDesc(odd)!=0)
    {
        saveMsg(s,odd,doo,normal);
        char* msg5= concatenate(msgType4,idStr);
        char* msg6=concatenate(msg5,& s[normal]);
        pthread_mutex_lock(& clients[desc].client_mutex);
        int err;
	allBytes = strlen(msg6);
        while(allBytes != sentBytes){
            err = write(findDesc(doo),msg6+sentBytes,strlen(msg6)-sentBytes);
            if(err<0){
                printf("Error");
                break;
            } else {
		sentBytes = sentBytes + err;
	    }
        }
        pthread_mutex_unlock(& clients[desc].client_mutex);

        msgType4=NULL;
        msg5=NULL;
        msg6=NULL;
        free(msg5);
        free(msg6);
    }
}
//funkcja opisującą zachowanie wątku - musi przyjmować argument typu (void *) i zwracać (void *)
void *ThreadBehavior(void *arg)
{
    char buf[2000];
    memset(buf, 0, 2000);
    char *p=buf;
    pthread_detach(pthread_self());
    int newSocket = *((int *)arg);
    int myIndex = findIndex(newSocket);
    pthread_mutex_init(& clients[myIndex].client_mutex,NULL);
    int t;
    while(1)
    {
        while((t=read(newSocket,(p++),1))> 0)
        {
            if(*(p-1)==126)
            {
		
		char * p2=buf;
		while((t=read(newSocket,p2,1))> 0){
			if(*(p2)==126){
				*(p2)='\0';
				break;
			}
			if(*(p2)=='\n')
			{
				*(p2)=' ';
			}
			p2+=1;
		}
		break;
            }
        }
       
        if(t<=0) break;
        char firstChar = buf[0];

        if(firstChar=='r')
        {
            contact(newSocket,buf,myIndex);
        }

        if(firstChar=='c')
        {
            showContacts(newSocket,myIndex);
        }
        if(firstChar=='d')
        {
            sendMsg(buf);
        }

        memset(buf,'\0',2000);
        p=buf;
    }
    pthread_mutex_destroy(&clients[myIndex].client_mutex);
    clients[myIndex].id=0;
    clients[myIndex].des=0;
    strcpy(clients[myIndex].name,"");
    pthread_exit(NULL);
}


int main(int argc, char* argv[])
{
    int server_socket_descriptor;

    int bind_result;
    int listen_result;
    char reuse_addr_val = 1;
    struct sockaddr_in server_address;
    struct sockaddr_storage serverStorage;

    socklen_t addr_size;
    //inicjalizacja gniazda serwera

    memset(& server_address, 0, sizeof(struct sockaddr));
    server_address.sin_family = AF_INET;
    server_address.sin_addr.s_addr = htonl(INADDR_ANY);
    server_address.sin_port = htons(SERVER_PORT);

    server_socket_descriptor = socket(AF_INET, SOCK_STREAM, 0);
    if (server_socket_descriptor < 0)
    {
        fprintf(stderr, "%s: Błąd przy próbie utworzenia gniazda..\n", argv[0]);
        exit(1);
    }
    setsockopt(server_socket_descriptor, SOL_SOCKET, SO_REUSEADDR, (char*)& reuse_addr_val, sizeof(reuse_addr_val));

    bind_result = bind(server_socket_descriptor, (struct sockaddr*)& server_address, sizeof(struct sockaddr));
    if (bind_result < 0)
    {
        fprintf(stderr, "%s: Błąd przy próbie dowiązania adresu IP i numeru portu do gniazda.\n", argv[0]);
        exit(1);
    }

    listen_result = listen(server_socket_descriptor, QUEUE_SIZE);
    if (listen_result < 0)
    {
        fprintf(stderr, "%s: Błąd przy próbie ustawienia wielkości kolejki.\n", argv[0]);
        exit(1);
    }
    int i = 0;
    pthread_t thread1[50];

    while(1)
    {
        if(clients[i].id==0){
            addr_size = sizeof serverStorage;
            int *connection_socket_descriptor = malloc(4);
            *connection_socket_descriptor = accept(server_socket_descriptor,  (struct sockaddr *) & serverStorage, & addr_size);
            if (connection_socket_descriptor < 0)
            {
                fprintf(stderr, "%s: Błąd przy próbie utworzenia gniazda dla połączenia.\n", argv[0]);
                exit(1);
            }
	    printf("%d\n",*connection_socket_descriptor);
            clients[i].des=*connection_socket_descriptor;

            pthread_create(& thread1[i], NULL, ThreadBehavior, &clients[i].des);

            printf("Błąd przy próbie utworzenia wątku, kod błędu: %d\n", i);
            free(connection_socket_descriptor);
        }
        i++;
        if(i==50){
            i=0;
        }
    }

    close(server_socket_descriptor);
    return(0);
}
