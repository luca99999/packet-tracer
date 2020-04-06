<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html><head>
  
  <meta content="text/html; charset=ISO-8859-1" http-equiv="content-type">
 

  
</head><body>
<h1>Access List Estese</h1>

<h2>Scenario: 2 reti locali, una rete tra router, una rete con server web e una rete con
server Dns.&nbsp; <br>
</h2>

<br>

<img src="scenario.jpg" alt=""><br>

<br>

<span style="color: rgb(36, 41, 46); font-family: Arial; font-size: 16px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255); display: inline ! important; float: none;">Le
access lists estese (100 &#8211; 199), permettono o negano il traffico sulla
base dell&#8217;indirizzo IP o della rete sorgente,<span>&nbsp;</span></span><span style="color: rgb(36, 41, 46); font-family: Arial; font-size: 16px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255);">&nbsp;</span><span style="color: rgb(36, 41, 46); font-family: Arial; font-size: 16px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255); display: inline ! important; float: none;">negano
o permettono il traffico sulla base dell&#8217;indirizzo IP o della rete di
destinazione,<span>&nbsp;</span></span><span style="color: rgb(36, 41, 46); font-family: Arial; font-size: 16px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255);"></span><span style="color: rgb(36, 41, 46); font-family: Arial; font-size: 16px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255); display: inline ! important; float: none;">negano
o permettono il traffico sulla base del numero di porta (servizio http,
ftp, dns ecc..) e/o del protocollo (udp, tcp, ecc). Nella access list
estesa sono sempre indicati la sorgente e la destinazione e
opzionalmente il numero di porta, servizio o protocollo. Si applicano il più vicino
possibile alla sorgente.</span><br style="font-family: Arial;">

<br style="font-family: Arial;">

<span style="font-family: Arial;">Dopo aver impostato le rotte statiche
sui router, gli indirizzi ip dei gateway e del dns su ciascun pc,
configurato e attivato il DNS e il server WEB sui server: </span><br style="font-family: Arial;">

<br style="font-family: Arial;">

<span style="font-family: Arial;">1) Si imposta una access list estesa
numero 100 per bloccare il traffico IP proveniente dal pc con indirizzo
192.168.1.3 e diretto al pc con indirizzo IP 192.168.3.1. Si inserisce
alla fine l'struzione permit ip any (sorgente) any (destinazione),
altrimenti verrà applicata l'istruzione implicita deny, consentendo in
questo modo, al traffico di altro tipo di percorrere la rete. Si
applica l'access list all'interfaccia Fa1/0 in ingresso;</span><br style="font-family: Arial;">

<br style="font-family: Arial;">

<span style="font-family: Arial;">Router#conf t
</span><br style="font-family: Arial;">

<span style="font-family: Arial;">Router(config)#access-list 100 deny
ip host 192.168.1.3 host 192.168.3.1</span><br style="font-family: Arial;">

<span style="font-family: Arial;">Router(config)#access-list 100 permit
ip any any</span><br style="font-family: Arial;">

<span style="font-family: Arial;">Router(config)#int Fa1/0</span><br style="font-family: Arial;">

<span style="font-family: Arial;">Router(config-if)#ip access-group 100
in</span><br>

<br style="font-family: Arial;">

<span style="font-family: Arial;">Nella configurazione sarà bloccato il
traffico proveniente dal pc con indirizzo ip 192.168.1.3 e diretto al
pc con indirizzo ip 192.168.3.1 mentre sarà consentito tutto il
restante traffico compreso quello ad esempio proveniente sempre dal pc
con indirizzo ip 192.168.1.3 ma direttto al server Web con indirizzo ip
192.168.4.1</span>;<br>

<br>

<span style="font-family: Arial;">2) Si vuole consentire il traffico
Web dalla rete 192.168.3.0 e si vuole consentire il
traffico Web solo all'host con indirizzo ip 192.168.1.1. Il rimanente
traffico tra le reti risulterà bloccato sfruttando l'istruzione deny
implicita presente nelle access-list.</span><br style="font-family: Arial;">

<span style="font-family: Arial;">Sul router di destra si elimina
l'access list precedentemente inserita e si imposta la nuova access
list per il traffico Web dell'host con indirizzo ip 192.168.1.1.</span><br style="font-family: Arial;">

<br style="font-family: Arial;">

<span style="font-family: Arial;">Router&gt;enable
</span>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router#conf
t</p>


<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config)#no
access-list 100</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config)#int
Fa1/0</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-if)#no
ip access-group 100 in</p>

<br style="font-family: Arial;">

<span style="font-family: Arial;">E' necessario abilitare il traffico
udp porta 53 del server DNS con </span><br style="font-family: Arial;">

<br style="font-family: Arial;">

<span style="font-family: Arial;">Router(config)#access-list 100 permit
udp 192.168.1.1 0.0.0.0 192.168.2.1 0.0.0.0 eq 53</span><br style="font-family: Arial;">

<br style="font-family: Arial;">

<span style="font-family: Arial;">E' necessario abilitare il traffico
tcp porta 80 del server Web protocollo HTTP </span><br style="font-family: Arial;">

<br style="font-family: Arial;">

<span style="font-family: Arial;">Router(config)#access-list 100 permit
tcp 192.168.1.1 0.0.0.0 192.168.4.1 0.0.0.0 eq 80</span><br style="font-family: Arial;">

<br style="font-family: Arial;">
&nbsp;<span style="font-family: Arial;">Successivamente si applica
l'access-list 100 all'interfaccia Fa1/0 del router in ingresso. La deny
implicita blocca il rimanente traffico.</span><br style="font-family: Arial;">

<br style="font-family: Arial;">

<span style="font-family: Arial;">Router(config-if)#ip access-group 100
in</span><br>

<p style="margin: 0px; text-indent: 0px;"><br>
</p>

<span style="font-family: Arial;">Sul router di sinistra per la rete
192.168.3.0/24 si abilita il traffico per il protocollo Udp porta 53
relativo al server DNS e il traffico tcp porta 80 relativo al server
WEB protocollo HTTP:</span><br style="font-family: Arial;">

<br style="font-family: Arial;">

<span style="font-family: Arial;">Router&gt;enable
</span>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router#conf
t</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config)#access-list
100 permit udp 192.168.3.0 0.0.0.255 192.168.2.1 0.0.0.0 eq 53</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config)#access-list
100 permit tcp 192.168.3.0 0.0.0.255 192.168.4.1 0.0.0.0 eq 80</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config)#int
fa1/0</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-if)#ip
access-group 100 in</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-if)#</p>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

&nbsp;<br>

<br>

<br>

<br>

</body></html>