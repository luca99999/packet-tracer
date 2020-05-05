<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html><head>


  
  <meta content="text/html; charset=ISO-8859-1" http-equiv="content-type"></head><body>
<span style="font-family: Arial;"></span>
<h1>OSPF Multiarea</h1>

<span style="font-family: Arial;">
Tutti i router, all'interno di una Area, dispongono di uno stesso database distribuito </span><span style="font-family: Arial;"></span><span style="font-family: Arial;">delle connessioni interne mentre i router di
confine<br>
tra più Aree dello stesso AS (Autonomous System) dispongono di un database per ogni Area a
cui sono collegati. <br>
L'Area 0 (backbone) è composta dai router di
confine di ogni singola Area, dai router che non appartengono ad altre aree e
<br>
dal router di confine dell'AS che scambia informazioni con altri router
di altri AS tramite il protocollo BGP.<br>
<br></span><br>

<img src="./scenario.jpg" alt=""><br style="font-family: Arial;">

<span style="font-family: Arial;">
Configurazione per ogni router:<br>
&nbsp;<br>
1) si attiva il processo Ospf
indicandone l'id;<br>
2) si comunicano le interfaccie di rete direttamente
connesse indicando oltre all'indirizzo di rete, la wildcard mask e l'area di appartenenza;</span><br style="font-family: Arial;">


<span style="font-family: Arial;"></span><span style="font-family: Arial;"><br>
Configurazione del Router0</span>:<br style="font-family: Arial;">

<br>
<span style="font-family: Arial;">Router# router ospf 1</span><br>
<span style="font-family: Arial;">
</span>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router# network 10.0.1.32 0.0.0.31 area 0</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router# network 10.0.1.96 0.0.0.15 area 0</p>
<br>
<span style="font-family: Arial;">

Si imposta, inoltre, la rotta di default verso il router esterno al sistema
autonomo:</span><br>


<br style="font-family: Arial;">


<span style="font-family: Arial;">Router(config)#ip route 0.0.0.0
0.0.0.0 fa0/0</span><br>
<br>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">e si avvia la propagazione della rotta di default a tutti i router Ospf<br>
</p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br>
</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router# default-information originate</p>
<br>

<span style="font-family: Arial;">
Configurazione del Router5 esterno all'AS</span>:<br>

<br>
<span style="font-family: Arial;">

Si imposta la rotta di default verso il router di confine del sistema
autonomo (nell'esempio non è attivato il BGP):</span><br>


<br style="font-family: Arial;">


<span style="font-family: Arial;">Router(config)#ip route 0.0.0.0
0.0.0.0 fa0/0</span><br><br>
<span style="font-family: Arial;">
Configurazione del Router1</span>:<br>

<br><span style="font-family: Arial;">Router# router ospf 1
</span>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><span style="font-family: Arial;">Router#</span> network 10.0.1.32 0.0.0.31 area 0</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><span style="font-family: Arial;">Router#</span> network 10.0.1.112 0.0.0.15 area 0</p>
<br>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><span style="font-family: Arial;">
Configurazione del Router3:</span></p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br>
<span style="font-family: Arial;"></span></p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><span style="font-family: Arial;">Router#</span>router ospf 1
</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;"> <span style="font-family: Arial;">Router#</span>network 10.0.1.64 0.0.0.31 area 1</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><span style="font-family: Arial;">Router#</span> network 10.0.1.112 0.0.0.15 area 0</p>
<br>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><span style="font-family: Arial;">
Configurazione del Router4:</span></p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br>
</p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><span style="font-family: Arial;">Router#</span>router ospf 1
</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><span style="font-family: Arial;">Router#</span> network 10.0.1.64 0.0.0.31 area 1</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><span style="font-family: Arial;">Router#</span> network 192.168.1.0 0.0.0.255 area 1</p>
<br>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><span style="font-family: Arial;">
Configurazione del Router2:</span></p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br>
<span style="font-family: Arial;"></span></p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router#router ospf 1
</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router# network 10.0.1.96 0.0.0.15 area 0</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router# network 11.0.1.0 0.0.0.3 area 0</p>
<br>
<span style="font-family: Arial;">Configurazione del Router6:</span><br>
<br>
<span style="font-family: Arial;">Router#router ospf 1
</span>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router# network 11.0.1.0 0.0.0.3 area 0</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;">Router# network 11.0.0.0 0.0.0.3 area 2</p>
<br>
<span style="font-family: Arial;">Configurazione del Router7:<br>
<br>
</span><span style="font-family: Arial;">Router#</span><span style="font-family: Arial;">router ospf 1
</span>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><span style="font-family: Arial;">Router#</span> network 11.0.0.0 0.0.0.3 area 2</p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><span style="font-family: Arial;">Router#</span> network 192.168.2.0 0.0.0.255 area 2</p>
<br>
<span style="font-family: Arial;"><br>
</span>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br>
</p>
<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><br>
</p>
<br>

<br>

</body></html>