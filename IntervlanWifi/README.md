<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html><head>
  
  <meta content="text/html; charset=ISO-8859-1" http-equiv="content-type">
  <title>prova</title>

  
</head><body>
<h1>Scenario: 3 Vlan, 1 Switch Layer 3 Multilivello, comunicazioni tra
Vlan con router, 1a rete
Wifi&nbsp; appartenente alla Vlan 3 con Server Radius di autenticazione
degli utenti,&nbsp; 1a rete Internet son sito Web e Dns.</h1>

<h1><br>
</h1>

<h1><img src="scenario.jpg" alt="">&nbsp;</h1>

<h1>Procedimento:</h1>

<div style="text-align: left;">1) Caricare il database delle Vlan negli
switch:<br>
</div>

<br>

<div style="text-align: center;"><img src="database.jpg" alt=""><br>
<br>
<br>
</div>

<br>

2) Assegnare le porte Access o Trunk alle rispettive Vlan negli switch:<br>

<br>

<br>

<div style="text-align: center;"><img src="access.jpg" alt=""><br>
</div>

<br>

3) Impostare il dhcp nel router wifi impostando la mashera di rete e il
dns e salvare; <br>

<br>

<br>

<div style="text-align: center;"><img src="dhcpwifi.jpg" alt=""><br>
</div>

<br>

4) Impostare l'indirizzo ip, la maschera di rete nella scheda Internet
del router wifi<br>

<br>

<br>

<div style="text-align: center;"><img src="wifirouter.jpg" alt=""><br>
</div>

<br>

5) Impostare la scheda Ethernet del server Radius:<br>

<br>

<br>

<div style="text-align: center;"><img src="radius1.jpg" alt=""><br>
</div>

<div style="text-align: center;"><br>
</div>

<br>

6) Impostare il default gateway sul server radius. Il gateway è svolto
dallo switch layer 3<br>

<br>

<br>

<div style="text-align: center;"><img src="radius2.jpg" alt=""><br>
</div>

<br>

7) Impostare il servizio AAA del server radius:&nbsp;
<br>

<br>

<br>

<div style="text-align: center;"><img src="radius3.jpg" alt=""><br>
</div>

<br>

<br>

8) Impostare la Wirelss Security sul router wifi<br>

<br>

<br>

<div style="text-align: center;"><img src="wifirouter1.jpg" alt=""><br>
</div>

<br>

9) Configurare la wireless dei dispositivi inserendo gli utenti
caricati precedentemente nel server Radius<br>

<br>

<br>

<div style="text-align: center;"><img src="wireless.jpg" alt=""><br>
</div>

<span style="font-style: italic;"><br>
<br>
</span>10) Configurare le interfacce virtuali delle Vlan nello switch
layer 3 , abilitare&nbsp; i pool dhcp per ogni vlan, impostare la
scheda verso il router come<span style="font-weight: bold;"> no switch port </span>e assegnare l'indirizzo ip, <br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; impostare la rotta di default
0.0.0.0&nbsp; 0.0.0.0. verso il router e abilitare il routing tra le vlan. Lanciare il comando
<span style="font-weight: bold;">sh ru</span> nella cli dal prompt <span style="font-weight: bold;">switch#</span> (altrimenti enable o exit)
per vedere i comandi inseriti.<br>

<br>

<br>

<div style="text-align: left;"><img src="switch3.jpg" alt="">
<br>
<br>
<img src="switch31.jpg" alt=""><br>
<br>
<br>
<img style="width: 1152px; height: 650px;" src="switch32.jpg" alt=""><br>
11) impostare sul router l'indirizzo ip della porta&nbsp; 8.0.0.1
verso&nbsp; la rete Internet e impostare le rotte statiche verso le
reti delle vlan interne della rete trust. Nella cli del router è
comunque possibile vedere i comandi inseriti digitando <span style="font-weight: bold;">sh ru</span><br>
<br>
<br>
<div style="text-align: center;">
<div style="text-align: center;"><img src="router.jpg" alt=""><br>
</div>
<div style="text-align: left;"><br>
<br>
12) Inpostare gli indirizzi ip delle porte e del getaway sui server Web
e Dns della rete Internet. Configurare e abilitare il servizio Dns<br>
<br>
<div style="text-align: center;"><img src="../../Users/Luca/AppData/Local/Temp/moz-screenshot-16.jpg" alt=""><br>
</div>
<br>
13) Verificare la navigazione dai browser dei pc client della rete
interna e della rete wifi<br>
<br>
<div style="text-align: center;"><img src="browser.jpg" alt=""><br>
</div>
</div>
</div>
</div>


</body></html>