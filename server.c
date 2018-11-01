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

#define SERVER_PORT 1234
#define QUEUE_SIZE 5


//struktura zawierająca dane, które zostaną przekazane do wątku
struct thread_data_t
{
int cd;
};
char otrzymane[1000];
int tab[50]={0};


pthread_mutex_t example_mutex = PTHREAD_MUTEX_INITIALIZER;
//funkcja opisującą zachowanie wątku - musi przyjmować argument typu (void *) i zwracać (void *)
void *ThreadBehavior(void *arg)
{
	char buf[1000];
    pthread_detach(pthread_self());
    int newSocket = *((int *)arg);
     while(1){
        read(newSocket, buf, sizeof(buf));
	pthread_mutex_lock(&example_mutex);
       strcpy(otrzymane,buf);
for(int k =0;k<50;k++){
if(tab[k]!=newSocket && tab[k]!=0){
	 write(tab[k],otrzymane,sizeof(otrzymane));
}
}
	pthread_mutex_unlock(&example_mutex);
    }
    pthread_exit(NULL);
}
/*
//funkcja obsługująca połączenie z nowym klientem
void handleConnection(int connection_socket_descriptor,int i) {
    //wynik funkcji tworzącej wątek
    int create_result = 0;

    //uchwyt na wątek
    

    //dane, które zostaną przekazane do wątku
    //TODO dynamiczne utworzenie instancji struktury thread_data_t o nazwie t_data (+ w odpowiednim miejscu zwolnienie pamięci)
    //TODO wypełnienie pól struktury

    create_result = pthread_create(&thread1[i], NULL, ThreadBehavior, (void *)t_data);
    if (create_result){
       printf("Błąd przy próbie utworzenia wątku, kod błędu: %d\n", create_result);
       exit(-1);
    }

    //TODO (przy zadaniu 1) odbieranie -> wyświetlanie albo klawiatura -> wysyłanie
}
*/
int main(int argc, char* argv[])
{
   int server_socket_descriptor;
   int connection_socket_descriptor;
   int bind_result;
   int listen_result;
   char reuse_addr_val = 1;
   struct sockaddr_in server_address;
	struct sockaddr_storage serverStorage;

  socklen_t addr_size;
   //inicjalizacja gniazda serwera
   
   memset(&server_address, 0, sizeof(struct sockaddr));
   server_address.sin_family = AF_INET;
   server_address.sin_addr.s_addr = htonl(INADDR_ANY);
   server_address.sin_port = htons(SERVER_PORT);

   server_socket_descriptor = socket(AF_INET, SOCK_STREAM, 0);
   if (server_socket_descriptor < 0)
   {
       fprintf(stderr, "%s: Błąd przy próbie utworzenia gniazda..\n", argv[0]);
       exit(1);
   }
   setsockopt(server_socket_descriptor, SOL_SOCKET, SO_REUSEADDR, (char*)&reuse_addr_val, sizeof(reuse_addr_val));

   bind_result = bind(server_socket_descriptor, (struct sockaddr*)&server_address, sizeof(struct sockaddr));
   if (bind_result < 0)
   {
       fprintf(stderr, "%s: Błąd przy próbie dowiązania adresu IP i numeru portu do gniazda.\n", argv[0]);
       exit(1);
   }

   listen_result = listen(server_socket_descriptor, QUEUE_SIZE);
   if (listen_result < 0) {
       fprintf(stderr, "%s: Błąd przy próbie ustawienia wielkości kolejki.\n", argv[0]);
       exit(1);
   }
int i = 0;
pthread_t thread1[50];

    
	int create_result;
   while(1)
   {	 addr_size = sizeof serverStorage;
       connection_socket_descriptor = accept(server_socket_descriptor,  (struct sockaddr *) &serverStorage, &addr_size);
       if (connection_socket_descriptor < 0)
       {
           fprintf(stderr, "%s: Błąd przy próbie utworzenia gniazda dla połączenia.\n", argv[0]);
           exit(1);
       }
	tab[i]=connection_socket_descriptor;
      pthread_create(&thread1[i], NULL, ThreadBehavior, &connection_socket_descriptor);
    
       printf("Błąd przy próbie utworzenia wątku, kod błędu: %d\n", i);
    	i++;
    
   }

   close(server_socket_descriptor);
   return(0);
}
