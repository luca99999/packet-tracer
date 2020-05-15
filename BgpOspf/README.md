<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html><head>

  
  <meta content="text/html; charset=ISO-8859-1" http-equiv="content-type"></head><body>
<h1><span style="font-family: Arial;">Configurazione del protocollo BGP
(Border Gateway Protocol) <br>
</span></h1>
<h1><span style="font-family: Arial;">Redistribuzione delle rotte tra BGP e OSPF</span></h1>

<br>
<span style="font-family: Arial;">Ogni AS è
costituito da un insieme di reti sotto un unico controllo
amministrativo che utilizzano, al loro interno, un protocollo di routing di tipo (IGP)<br>
Interior Gateway
Protocolo come l'OSPF. </span><br>


<span style="font-family: Arial;">I Border Router (Router di confine)
realizzano la connessione fra AS diversi e </span><span style="font-family: Arial;">possono essere considerati quindi come punto di ingresso e di uscita verso altri AS.</span><span style="font-family: Arial;"> <br>
I partecipanti alle comunicazioni sono esplicitamente selezionati non
tra i router di next-hop come negli IGP ma tra macchine raggiungibili
nell&#8217;internet (neighbor AS).</span><br>


<span style="font-family: Arial;">Ogni Autonomous System dispone di un
proprio numero identificativo che viene rilasciato da IANA su scala mondiale</span><span style="font-family: Arial;"></span><span style="font-family: Arial;">.
<br>
</span><span style="font-family: Arial;">Il protocollo BGP è un Exterior
Gateway Protocol di tipo Path Vector utilizzato dai router di confine
per lo
scambio di rotte tra Autonomous Systems. <br>Ogni messaggio contiene il numero di AS e l'intero percorso da
attraversare verso la destinazione. </span><span style="font-family: Arial;"></span><br>
<span style="font-family: Arial;">Due sistemi autonomi possono venire a
conoscenza uno delle rotte interne dell'altro tramite la redistribuzione</span>.<br>

<span style="font-family: Arial;"></span><br>

<span style="color: rgb(89, 89, 89); font-family: Verdana,Geneva,sans-serif; font-size: 15px; font-style: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; background-color: rgb(255, 255, 255); display: inline ! important; float: none;"></span><span style="font-family: Arial;"><br>
 Nello scenario sono presenti due router
di confine per i sistemi autonomi AS 100 e AS 200. Al loro interno sono
presenti un insieme di reti che utilizzano il<br>
protocollo OSPF per le rotte intra e inter Area. Viene effettuata la
redistribuzione delle rotte OSPF nel BGP e la redistribuzione delle
rotte BGP nell'OSPF.<br>
<br>
<br>
</span><img src="scenario.jpg" alt=""><br>
<br>

<br>

<br>

<span style="font-family: Arial;"><br>
<span style="font-weight: bold;"><span style="font-family: Arial;">Configurazione del sistema autonomo AS 100:</span></span><span style="font-family: Arial;"><br>
</span></span><br><span style="font-family: Arial;">
Router(config)#router bgp 100</span><br style="font-family: Arial;">
<span style="font-family: Arial;">Router(config-router)#neighbor 10.0.254.1 remote-as 200</span>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-router)# redistribute ospf 1</p><br style="font-family: Arial;">
<span style="font-family: Arial;">
Router(config)#router ospf 1
</span>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-router)# redistribute bgp 100 subnets </p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-router)# network 192.168.0.0 0.0.0.255 area 0</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-router)# default-information originate</p>
<p style="margin: 0px; text-indent: 0px;"><br>
 </p>

<span style="font-family: Arial;"><span style="font-weight: bold;"><span style="font-family: Arial;">Configurazione del sistema autonomo AS 200:</span></span><span style="font-family: Arial;"><br>
</span></span><br>
<span style="font-family: Arial;">
Router(config)#router bgp 200</span><br style="font-family: Arial;">

<span style="font-family: Arial;">Router(config-router)#neighbor 10.0.254.2 remote-as 100</span>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-router)# redistribute ospf 1</p>
<br style="font-family: Arial;">

<span style="font-family: Arial;">
Router(config)#router ospf 1
</span>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-router)# redistribute bgp 200 subnets </p>


<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-router)# network 192.168.1.0 0.0.0.255 area 0</p>


<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router(config-router)# default-information originate</p>
<br>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br>
</p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><span style="font-family: Arial;">Ogni
volta che una nuova subnet viene aggiunta all'OSPF automaticamente
questa nuova rotta viene acquisita dall'AS confinante (neighbor).</span></p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><span style="font-family: Arial;"><br>
</span></p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><span style="font-family: Arial;"> </span><span style="font-weight: bold;">Tabella di routing dell'AS 100</span></p>
<br>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router#show ip route
</p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Codes: C - connected, S - static, I - IGRP, R - RIP, M - mobile, B - BGP</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">       * - candidate default, U - per-user static route, o - ODR</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">       P - periodic downloaded static route</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br></p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Gateway of last resort is not set</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br></p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">O IA 9.0.0.0/8 [110/2] via 192.168.0.3, 00:30:22, FastEthernet0/0</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">     10.0.0.0/30 is subnetted, 1 subnets</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">C       10.0.254.0 is directly connected, Serial2/0</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">O IA 11.0.0.0/8 [110/2] via 192.168.0.2, 00:30:12, FastEthernet0/0</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">B    12.0.0.0/8 [20/2] via 10.0.254.1, 00:00:00</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">B    13.0.0.0/8 [20/2] via 10.0.254.1, 00:00:00</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">C    192.168.0.0/24 is directly connected, FastEthernet0/0</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">B    192.168.1.0/24 [20/20] via 10.0.254.1, 00:00:00</p>

<br>
<span style="font-weight: bold; font-family: Arial;">Tabella di routing dell'AS 200</span><br style="font-family: Arial;">
<br>
<span style="font-family: Arial;">Router#show ip route
</span>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Codes: C - connected, S - static, I - IGRP, R - RIP, M - mobile, B - BGP</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">       D - EIGRP, EX - EIGRP external, O - OSPF, IA - OSPF inter area</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">       N1 - OSPF NSSA external type 1, N2 - OSPF NSSA external type 2</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">       E1 - OSPF external type 1, E2 - OSPF external type 2, E - EGP</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">       i - IS-IS, L1 - IS-IS level-1, L2 - IS-IS level-2, ia - IS-IS inter area</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">       * - candidate default, U - per-user static route, o - ODR</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">       P - periodic downloaded static route</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br></p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Gateway of last resort is not set</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br></p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">B    9.0.0.0/8 [20/2] via 10.0.254.2, 00:00:00</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">     10.0.0.0/30 is subnetted, 1 subnets</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">C       10.0.254.0 is directly connected, Serial2/0</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">B    11.0.0.0/8 [20/2] via 10.0.254.2, 00:00:00</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">O IA 12.0.0.0/8 [110/2] via 192.168.1.3, 00:32:18, FastEthernet0/0</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">O IA 13.0.0.0/8 [110/2] via 192.168.1.2, 00:32:18, FastEthernet0/0</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">B    192.168.0.0/24 [20/1] via 10.0.254.2, 00:00:00</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">C    192.168.1.0/24 is directly connected, FastEthernet0/0</p>
<br>

</body></html>