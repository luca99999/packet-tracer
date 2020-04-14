<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html><head>
  
  <meta content="text/html; charset=ISO-8859-1" http-equiv="content-type">
  

  
</head><body>
<span style="font-family: Arial;"></span>
<h1><span style="font-family: Arial;">DMZ con un Router Firewall:
NAT-PAT (Port Forwarding) su Server Web e Server Mail Smtp.<br>
</span></h1>

<span style="font-family: Arial;">Nello scenario il router svolge due
funzioni:<br>
1) esegue il NAT (Network Address Translation) sul traffico in uscita
traducendo l'indirizzo IP di origine dei pacchetti provenienti dalla
LAN interna nell'indirizzo pubblico dell'interfaccia esterna;<br>
2) instrada in modo appropriato il traffico in entrata verso la LAN
interna Trust oppure esegue il PAT (Port Address Translation)
individuando il servizio sul server nella DMZ in base <br>
al numero di
porta di destinazione (ad esempio porta 80 protocollo Tcp);<br>
<br>
Nella configurazione delle access list l'opzione <span style="font-weight: bold;">established</span>
consente il traffico di ritorno TCP in presenza di connessioni già
attivate (o che sembrino tali) da richieste originate dalla rete locale
interna. <br>
Il router
(firewall) verifica che i segmenti TCP abbiano i flag ACK o RST
impostati ad "1" cosa questa che caratterizza i messaggi delle connessioni
già aperte. <br>
Le richieste di nuove connessioni TCP provenienti
dall'esterno caratterizzate dall'avere il flag SYS impostato ad "1"
vengono quindi scartate. <br>
Inoltre nella configurazione delle Access List (ACL) con il NAT:<br>
1) per il traffico in uscita dal router il NAT è attivato prima&nbsp;
delle ACL; <br>
2) Per il traffico in entrata sul router sono attivate prima le ACL e
poi il NAT; <br>
<br>
Rete LAN:&nbsp; 192.168.1.0/24.<br>
Rete DMZ: 192.168.0.0/24 con server Http e server Mail Smtp configurati
sullo stesso Host con indirizzo ip 192.168.0.1.<br>
<br>
Regole Access List da applicare sull'interfaccia pubblica del router:<br>
1)&nbsp; permettere il traffico HTTP entrante verso il Server Web porta
80 e porta 443;<br>
2)&nbsp; </span><span style="font-family: Arial;">permettere il
traffico Smtp entrante verso il Server Mail porta 25;</span><span style="font-family: Arial;"><br>
3)&nbsp; permettere il traffico di rientro delle sessioni TCP aperte
dall'interno della rete locale Trust con l'opzione established;<br>
4)&nbsp; permettere il transito delle risposte ai PING lanciati
dall'interno della rete locale Trust;<br>
5)&nbsp; blocchi ogni altro tipo di traffico entrante ad esempio
proveniente dal pc Hacker;</span><br>

<br>

<br>

<img src="Scenario.jpg" alt=""><br>

<br>

<br>

<br>

<br>

<br>

<span style="font-family: Arial;">Configurazione del NAT-PAT sul router:<br>
<br>
Si definisce un insieme di indirizzi della rete trust (access-list) per
i quali è consentito abilitare il NAT.</span><br>

<br>

<span style="font-family: Arial;">Router&gt;enable<br>
Router#conf
t</span><br>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config)#access-list 1 permit 192.168.1.0 0.0.0.255 </p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;"> </p>
&nbsp; <br>
<span style="font-family: Arial;">la access list 1 dovrà essere
tradotta in NAT in base all' indirizzo IP dell'interfaccia se2/0 del
router in modalità overload (utilizzando</span> <span style="font-family: Arial;">un unico indirizzo IP per la traduzione delle porte). <br>
</span><br>
<span style="font-family: Arial;">Router(config)#ip nat inside source list 1 interface ser2/0 overload</span><br>
<br>
<span style="font-family: Arial;">Si configurano i ruoli delle interfacce del router</span>:<br>
<br style="font-family: Arial;">

<span style="font-family: Arial;">Router(config)#int fa 1/0
</span>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-if)#ip nat inside</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-if)#int fa0/0</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-if)#ip nat inside</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-if)#int se2/0</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-if)#ip nat outside</p>
<br>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Per realizzare la DMZ dove è collocato il server Web e Smtp è utilizzato il port forwarding. Il router inoltra automaticamente all&#8217;indirizzo di destinazione&nbsp; il pacchetto <br>
</p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">sulla base del numero della porta rendendone così disponibili i relativi servizi all'esterno.<br>
</p>
<br>
<span style="font-family: Arial;">Router#conf t
</span><br style="font-family: Arial;">
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">	</p>
<span style="font-family: Arial;">Router(config)#ip nat inside source static tcp 192.168.0.1 80 2.0.0.1 80</span><br>
<span style="font-family: Arial;">Router(config)#ip nat inside source static tcp 192.168.0.1 25 2.0.0.1 25</span><br>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br>
</p>
<br>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">// <span style="font-family: Arial;">consente il traffico di ritorno TCP in presenza di connessioni già
attivate </span></p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config)#access-list 100 permit tcp any 2.0.0.1 0.0.0.0 established</p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br>
</p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">// consente il traffico dall'esterno sul server Web nella DMZ<br>
</p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config)#access-list 100 permit tcp any 2.0.0.1 0.0.0.0 eq 80</p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br>
</p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">// consente il traffico dall'esterno sul server SMTP nella DMZ</p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config)#access-list 100 permit tcp any host 2.0.0.1 eq 25</p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br>
</p>
<span style="font-family: Arial;">// Consente la risposta del DNS esterno</span><br>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config)#access-list 100 permit udp any eq 53 host 2.0.0.1</p>
<span style="font-family: Arial;"><br>
// consente il transito delle risposte ai PING lanciati
dall'interno della rete locale Trust;</span>
<p style="margin: 0px; text-indent: 0px;">	</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config)#access-list 100 permit icmp any any echo-reply</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br>
</p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config)#int se2/0</p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">// L'ACL 100 va applicata alla porta Se2/0 in ingresso<br>
</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-if)#ip access-group 100 in</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-if)#</p>
<br>
<br>
<br>

<br>

</body></html>