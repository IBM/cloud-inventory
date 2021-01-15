<p align="center">
    <a href="https://cloud.ibm.com">
        <img src="https://my1.digitalexperience.ibm.com/8304c341-f896-4e04-add0-0a9ae02473ba/dxdam/2d/2d559197-6763-4e47-a2cb-8f54c449ff26/ibm-cloud.svg" height="100" alt="IBM Cloud">
    </a>
</p>

<p align="center">
    <a href="https://cloud.ibm.com">
		<img src="https://img.shields.io/badge/IBM%20Cloud-powered-blue.svg" alt="IBM Cloud">
    </a>
    <a href="https://www.python.org">
		<img src="https://img.shields.io/badge/platform-python-lightgrey.svg?style=flat%22%20alt=%22platform">
	</a>
	<a href="https://www.gnu.org/licenses/gpl-3.0.en.html">
		<img src="https://img.shields.io/badge/license-gpl3-blue.svg?style=flat" alt="GPL 3">
	</a>
	<img src="https://img.shields.io/badge/release-v1.0-red">
</p>
<p></p>
<p align="center">
  <b>Cloud Inventory</b>
  <br>
  <a href="http://cloudinventory.cloud"><strong>Discover Cloud Inventory »</strong></a>
  <br>
  <br>
  <a href="https://github.com/VSAlmeida/Cloud-Inventory/issues/new" target="_blank">Report bug</a>
</p>


## Table of contents

- [Quick start](#quick-start) :seedling:
- [Observations](#observations) :hammer:
- [Features](#features) :gift:
- [Bugs and feature requests](#bugs-and-feature-requests) :beetle:
- [Creators](#creators) :space_invader:
- [Contributors](#contributors) :raised_hands:


## Quick start
<b><a href="https://ibm.box.com/s/koqehz7i5hyrtasi8pbnb9bujlr1xz2z"> Click here to see the video tutorial</a></b>
1. Upload a spreadsheet;
2. Select the type of spreadsheet. This type can be Generic or Bluepad;
   - <b>If Generic, the spreadsheet must contain the following columns: "CPU", "Memória", "Datacenter", "SO", "QTD" and "Boot Disk"</b>
   - Additionl fields: "Public"(
Indicates whether the machine must have a public endpoint), "Disk1" (Additional Disk)
    - the datacenter column must contain the datacenter code
    - If the machine settings are not within the IBM Cloud standards, select yes on "As Is", this will convert the machines to VSI following some common rules. 
    -  If Datacenter or SO is not available on the spreadsheet, this application will use the Datacenter and SO Standard selected on the interface. 
    -  if the "apart disk" value = yes, the boot disk does not influence the total sum os disks. 
    -  Choose the "Resource Type" to indicate if you have generic VM's, EC2 or Physical Machines.  
    -  In "VSI type", select "IBM Public VSI" or "IBM Reserved VSI".
3. After selecting the desired options, just click in "Price" and wait some minutes. At the end of processing, the processed file will be downloaded.

<b>See the example worksheets(bpmini.xlsx and quotomationexample.xlsx). bpmini.xlsx is an example for Bluepad, and quotomationexample.xlsx is an example for a generic spreadsheet</b>


## Observations
1. <b>When using quotomation with a generic spreadsheet, ensure that you are uploading a spreadsheet that contains only the machines that must be converted and priced. Also ensure that this spreadsheet does not have a header above the column names. </b>
   <br>

2. <b>Unfortunately, the file is not processed with formatting, that is, the processed file is returned without formatting. However, you only need to copy this returned values and paste into a formatted spreadsheet.</b>
3. <b>By default, we are using "Flavor" like B1.CPUxRAMxBoot_Disk, so please, check if the flavor you are using in the spreadsheet follow this pattern (If the option "As Is" is false)</b>
4. <b>If you are using Bluepad, upload only "VSIs" sheet, without header.</b>

## Features

1. 
2. 
3.
4.
5. 




## Bugs and feature requests

Have a bug or a feature request? Please first read and contact us (Community Section) and search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/VSAlmeida/Cloud-Inventory/issues/new). If you prefer, contact us.

---

## Cloud Inventory Roadmap

The plan for delivering new versions of Cloud Inventory [is described here](/doc/cloudinventory-v2.md) and will be updated as the project proceeds.

## Project Build Status

Project|Build Status
---|---
Virtual Server for Classic|![](https://img.shields.io/badge/status-ready-brightgreen)
Virtual Servers for VPC|![](https://img.shields.io/badge/status-under%20development-purple)
Issues|![](https://img.shields.io/badge/issues-0-red)
VPCs|![](https://img.shields.io/badge/status-under%20development-purple)
---

## Creators
**Vinicius Sebadelhe** (vinicius.sebadelhe@ibm.com)
- <https://www.linkedin.com/in/vinisalmeida/>

**Erika Garcia** (erika.garcia@ibm.com)
- <https://www.linkedin.com/in/erikagarciasilva/>

**Isabel Bernardo** (isabel.bernardo@ibm.com)
- <https://www.linkedin.com/in/isabel-bernardo-3895a095/>

**Luis Falcão** (luis.falcao@ibm.com)
- <https://www.linkedin.com/in/luisfalcao/>

## Contributors
