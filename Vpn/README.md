<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html><head>
  
  <meta content="text/html; charset=ISO-8859-1" http-equiv="content-type">
  
  
</head><body>
<h1><span style="font-family: Arial;">Configurazione della VPN IPsec
Site-to-Site con Packet Tracer</span></h1>

<span style="font-family: Arial;">Le VPN utilizza l'IPsec che garantisce la
cifratura, l'integrità dei pacchetti (compreso l'Header),
l'autenticazione  degli utenti e indirettamente <br>
fornisce il controllo dell'accesso tramite l'uso di un database (SAD) per le Security Associations.<br><br>
IPsec utilizza tre protocolli:</span><span style="font-family: Arial;"></span><span style="font-family: Arial;"></span><span style="font-family: Arial;"></span><span style="font-family: Arial;"><br>
<br>
1) Authentication Header (AH): garantisce l`autenticazione e
l`integrità del messaggio ma non offre la cifratura del payload. Prima
del payload, del segmento TCP o UDP, è inserita <br>
una intestazione AH, con modalità diverse a seconda del tipo di
utilizzo (Trasport Mode o Tunnel Mode - VPN), composta dallo SPI (che
identifica la security association con il destinatario), <br>
dal Sequence Number progressivo (per evitare attacchi esterni) e
dall'hash (HMAC-Hashed) ottenuto sottoponendo </span><span style="font-family: Arial;">l'intestazione IP (esclusi i campi TTL e
Checksum) e il payload dei dati <br>
ad una funzione di hashing.</span><span style="font-family: Arial;"> AH non è
compatibile con il NAT standard.</span><span style="font-family: Arial;"><br>
2) Encapsulating Security Payload (ESP): fornisce autenticazione,
confidenzialità e autenticazione: E' possibile utilizzare solo il
servizio di confidenzialità o i servizi di autenticazione e integrità <br>
oppure tutti i servizi insieme. Crea una intestazione ESP (con i campi
SPI ed SN come in AH) e un Trailer (coda) che sono aggiunti al payload. Il payload e il Trailer Esp vengono poi cifrati. <br>
L'intestazione Esp insieme al payload cifrato sono passati ad una
funzione di hashing per ottenere il campo auth contenente l'hash per
l'autenticazione.<br>
3) Il protocollo Internet Key Exchange (IKE) crea una Security Association
(canale sicuro) che implementa lo scambio sicuro delle
chiavi crittografiche ricavate con uno dei protocolli<br>
del gruppo Diffie-Hellman DH1,DH2,DH5. L'IKE è diviso in due fasi. La prima fase
crea una SA per la seconda fase che a sua volta crea una SA per il
protocollo IPSEC.<br>
<br>
La modalità Tunnel Mode IPsec cifra
completamente
i pacchetti senza utilizzare entrambi i protocollli AH e ESP
contemporaneamente. Il pacchetto originale cifrato è
inserito <br>
all'interno di un altro pacchetto (tunneling) che contiene i due indirizzi
pubblici dei router di confine coinvolti nella VPN. <br>
Gli indirizzi delle
reti interne non sono quindi visibili all'esterno dai router intermedi che
quindi possono non conoscere le rotte verso le reti locali sorgenti e
destinazione. <br>
<br>
Nello scenario i router sono della serie 2901 e gli switch sono della
serie 2960. Non sono impostate rotte statiche verso la rete
192.168.3.0/24&nbsp;  e verso la rete 192.168.2.0/24.<br>
Una volta attivata la VPN tra i router R2 e R3 sarà
possibile mettere in comunicazione le due reti locali (ad es:
effettuando il ping) pur mantenendo inalterata la
configurazione <br>
della tabella di routing del router intermedio R1.<br>
<br>
<br>
</span><img src="./immagini/Scenario.jpg" alt=""><br>

<span style="font-family: Arial; font-weight: bold;">Procedimento:</span><br>

<br>

<span style="font-family: Arial;">Sui router R2 e R3 che svolgono il
ruolo di gateway per le due Lan della VPN è necessario
installare il pacchetto software per la sicurezza SECURITYK9,</span><br>

<br>

<span style="font-family: Arial;">R2(config)#license boot module c2900
technology-package securityk9</span><br>

<br>

<span style="font-family: Arial;">salvare la configurazione e riavviare
il router.<br>
<br>
R2#copy run start
</span>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Destination
filename [startup-config]? </p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Building
configuration...</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">[OK]</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">R2#reload</p>

<br>

<span style="font-family: Arial;">R3(config)#license boot module c2900
technology-package securityk9</span><br>

<br>

<span style="font-family: Arial;">R3#copy run start
</span><br style="font-family: Arial;">

<span style="font-family: Arial;">Destination filename
[startup-config]? </span>
<br style="font-family: Arial;">

<span style="font-family: Arial;">Building configuration...
</span><br style="font-family: Arial;">

<span style="font-family: Arial;">[OK]
</span><br style="font-family: Arial;">

<span style="font-family: Arial;">R3#reload<br>
<br>
Per verificare l'installazione della security license securityk9<br>
<br>
R2#show version</span><br>

<span style="font-family: Arial;">R3#show version</span><br>

<span style="font-family: Arial;"><br>
</span><img src="./immagini/securityk9.jpg" alt=""><br>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br>
</p>

<br>

I<span style="font-family: Arial;">mpostare le rotte di default sui due
router R2 e R3</span> <span style="font-family: Arial;">verso il router intermedio R1</span><br style="font-family: Arial;">

<br style="font-family: Arial;">

<span style="font-family: Arial;">R2(config)#ip route 0.0.0.0 0.0.0.0
2.0.0.2 </span><br style="font-family: Arial;">

<span style="color: rgb(3, 3, 3); font-family: Arial; font-size: 14px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; background-color: rgb(249, 249, 249); display: inline ! important; float: none;"></span><span style="font-family: Arial;">R3(config)#ip route 0.0.0.0 0.0.0.0
3.0.0.2 </span><br>

<br>

<span style="font-family: Arial;">Impostare le ACL estese sui router R2
ed R3 della VPN per consentire il traffico da una rete locale all'altra<br>
<br>
R2(config)#access-list 100 permit ip 192.168.3.0 0.0.0.255 192.168.2.0
0.0.0.255</span><br>

<span style="font-family: Arial;">R3(config)#access-list 100 permit ip
192.168.2.0 0.0.0.255 192.168.3.0 0.0.0.255</span><br>

<br>

(<span style="font-family: Arial;">PHASE 1): Autenticazione IPSEC dei
peers (R2, R3) e negoziazione dei parametri per la creazione di un canale di
comunicazione sicuro</span><br style="font-family: Arial;">

<span style="font-family: Arial;">utilizzato poi per la configurazione della PHASE 2:</span><br>
&nbsp;
<br>
<span style="font-family: Arial;">Il protocollo ISAKMP implementa lo
scambio di messaggi per l'IKE</span>.<br>

<span style="font-family: Arial;">Viengono Impostate la politica ISAKMP e la
chiave ISAKMP (algoritmi di
cifrazione e autenticazione quali es: DES, AES, MD5, DH ecc.) <br></span><span style="font-family: Arial;">Con il metodo preshared secret-key
(PSK) verrà </span><span style="font-family: Arial;">utilizzata una
chiave simmetrica per l'autenticazione reciproca dei peers.<br>
La cifrazione è effettuata tramite l'algoritmo AES con chiave
crittografica a 256 bit.<br>
</span><br>

<span style="font-family: Arial;">R2(config)#crypto isakmp policy 10
</span><br style="font-family: Arial;">

<span style="font-family: Arial;">R2(config-isakmp)# encryption aes 256
</span><br style="font-family: Arial;">

<span style="font-family: Arial;">R2(config-isakmp)# authentication
pre-share
</span><br style="font-family: Arial;">

<span style="font-family: Arial;">R2(config-isakmp)# group 5</span><br style="font-family: Arial;">

<br style="font-family: Arial;">

<span style="font-family: Arial;">R3(config)#crypto isakmp policy 10
</span><br style="font-family: Arial;">

<span style="font-family: Arial;">R3(config-isakmp)# encryption aes 256
</span><br style="font-family: Arial;">

<span style="font-family: Arial;">R3(config-isakmp)# authentication
pre-share
</span><br style="font-family: Arial;">

<span style="font-family: Arial;">R3(config-isakmp)# group 5</span><br>

<br>
<span style="font-family: Arial;">Impostazione della chiave isakmp comune e dell'indirizzo IP pubblico del router sul lato opposto della VPN.<br>
<br>
R2(config)#crypto isakmp key pippo address 3.0.0.1</span><br>

<span style="font-family: Arial;">R3(config)#crypto isakmp key pippo
address 2.0.0.1</span><br style="font-family: Arial;">

<br>

(PHASE 2) <span style="font-family: Arial;">Impostazione di una sessione
sicura IPSEC per il traffico VPN tra i peers</span><br>

<br>

<span style="font-family: Arial;">Viene creato un transform set
costituito dal protocollo esp e dall'algoritmo aes </span><span style="font-family: Arial;">che sarà applicato al traffico
protetto come <br>
parte della Security Association tra i peers.</span><br>

<br>

<span style="font-family: Arial;">R2(config)#crypto ipsec transform-set
VPNTUNNEL esp-aes 256 esp-sha-hmac</span><br style="font-family: Arial;">

<span style="font-family: Arial;">R3(config)#crypto ipsec transform-set
VPNTUNNEL esp-aes 256 esp-sha-hmac</span><br>

<br>

<span style="font-family: Arial;">Impostazione di una crypto map che
combina i vari parametri della SA</span><br>

<br>

<span style="font-family: Arial;">R2(config)#crypto map IPSEC-MAP 10
ipsec-isakmp</span>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">R2(config-crypto-map)#
set peer 3.0.0.1</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">R2(config-crypto-map)#
set pfs group5</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">R2(config-crypto-map)#
set security-association lifetime seconds 86400</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">R2(config-crypto-map)#
set transform-set VPNTUNNEL </p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">R2(config-crypto-map)#
match address 100</p>

<br>

<p style="margin: 0px; text-indent: 0px;"><br>
</p>

<p style="margin: 0px; text-indent: 0px;"><span style="font-family: Arial;">R3(config)#crypto map IPSEC-MAP 10
ipsec-isakmp</span>
</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">R3(config-crypto-map)#
set peer 2.0.0.1</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">R3(config-crypto-map)#
set pfs group5</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">R3(config-crypto-map)#
set security-association lifetime seconds 86400</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">R3(config-crypto-map)#
set transform-set VPNTUNNEL </p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">R3(config-crypto-map)#
match address 100</p>

<br>

<span style="font-family: Arial;">Associazione delle configurazioni della
cripto map con le interfaccie del tunnel VPN</span><br>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br>
</p>

<span style="font-family: Arial;">R2(config)#int gig0/1
</span>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">R2(config-if)#crypto
map IPSEC-MAP</p>

<br style="font-family: Arial;">

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">R3(config)#int
gig0/0
</p>

<p style="margin: 0px; text-indent: 0px;"><span style="font-family: Arial;">R3(config-if)#crypto map IPSEC-MAP</span> </p>

<p style="margin: 0px; text-indent: 0px;"> </p>

<br>
<p style="margin: 0px; text-indent: 0px;"><span style="font-family: Arial;">Esaminando il pacchetto IP, in Simulation Mode, gli indirizzi IP Sorgente e Destinazione corrispondono <br>
</span></p>
<p style="margin: 0px; text-indent: 0px;"><span style="font-family: Arial;">agli indirizzi pubblici dei router peers della VPN. </span><br>
</p>

<br>

<br>

<img src="./immagini/IPsec1.jpg" alt=""><br>

<br>

<br>

<span style="font-family: Arial;">All'interno del pacchetto IP (campo DATA) è presente il secondo pacchetto IP incapsulato dopo l'Header ESP. <br>
 Il router intermedio </span>R1<span style="font-family: Arial;"> non ha visibilità </span><span style="font-family: Arial;">dei campi relativi agli indirizzi IP sorgente e destinazione<br>
degli hosts nelle reti locali in quanto l'intero pacchetto incapsulato </span><span style="font-family: Arial;">transita cifrato all'interno del tunnel <br>
creato dalla VPN.<br>
</span><br>
<br>

<img src="./immagini/IPsec2.jpg" alt=""><br>

<br>

</body></html>