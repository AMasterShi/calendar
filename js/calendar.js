function calendar(containerId){
	let container = document.getElementById(containerId)
	let currenttime = document.createElement("time")
	let br = document.createElement("br")
	let currentdate = document.createElement("time")
	let calendardiv = document.createElement("div")
	container.appendChild(currenttime)
	container.appendChild(br)
	container.appendChild(currentdate)
	container.appendChild(calendardiv)
	
	let weeks = ["日", "一", "二", "三", "四", "五", "六"]
	let months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
	let cty = Number(new Date().getFullYear())
	let tenyears = []
	let years = []
	let count=0
	for(let yy=cty-100;yy<=cty+100;yy++){
		count++
		years.push(yy)
		if(count === 9){
			tenyears.push(years)
			years = []
			count = 10
		}
		if(count != 10 && count%10 === 0){
			tenyears.push(years)
			years = []
		}
		if(yy === cty+100){
			tenyears.push(years)
			years = []
		}
	}
	function showtime(){
		let date = new Date()
		let hour = date.getHours()
		let minutes = date.getMinutes()
		let seconds = date.getSeconds()
		currenttime.innerText = (hour<10?'0'+hour:hour) + ":" + (minutes<10?'0'+minutes:minutes) + ":" + (seconds<10?'0'+seconds:seconds)
		currenttime.setAttribute("class","fs-1 currenttime")
	}
	showtime()
	let minidaemon = new MiniDaemon(null, showtime, 1000)
	minidaemon.start()
	function showdate(){
		let date = new Date()
		let year = date.getFullYear()
		let month = date.getMonth()+1
		let day = date.getDate()
		let week = weeks[date.getDay()]
		currentdate.innerText = year + "年" + (month<10?'0'+month:month) + "月" + (day<10?'0'+day:day) + "日" + " 星期" + week
		currentdate.setAttribute("class","currentdate")
	}
	showdate()
	function getcurrentdatedays(y, m){
		let date = new Date(y, m)
		let next = new Date(y, m+1)
		return Math.floor((next.getTime()-date.getTime())/1000/60/60/24)
	}
	
	function createdatetable(table, date, type){
		let calendar = calendardiv
		if(table){
			calendar.innerHTML = ""
		}
		if(type === "calendar"){
			let table = document.createElement("table")
			let thead = document.createElement("thead")
			let tbody = document.createElement("tbody")
			let theadTr = document.createElement("tr")
			let theadTd = document.createElement("td")
			theadTd.setAttribute("colspan","5")
			theadTd.setAttribute("class","text-start")
			let span = document.createElement("span")
			if(!date){
				date = new Date()
			}
			let year = date.getFullYear()
			let month = date.getMonth()+1
			let ny = year+"年"+(month<10?'0'+month:month)+"月"
			span.innerText = ny
			span.setAttribute("class","ny")
			theadTd.appendChild(span)
			let theadUp = document.createElement("td")
			theadUp.innerHTML = "<i class='bi bi-chevron-up'></i>"
			let theadDown = document.createElement("td")
			theadDown.innerHTML = "<i class='bi bi-chevron-down'></i>"
			theadTr.appendChild(theadTd)
			theadTr.appendChild(theadUp)
			theadTr.appendChild(theadDown)
			thead.appendChild(theadTr)
			let tbodyTopTr = document.createElement("tr")
			let week0 = document.createElement("td")
			week0.innerText = weeks[0]
			let week1 = document.createElement("td")
			week1.innerText = weeks[1]
			let week2 = document.createElement("td")
			week2.innerText = weeks[2]
			let week3 = document.createElement("td")
			week3.innerText = weeks[3]
			let week4 = document.createElement("td")
			week4.innerText = weeks[4]
			let week5 = document.createElement("td")
			week5.innerText = weeks[5]
			let week6 = document.createElement("td")
			week6.innerText = weeks[6]
			
			tbodyTopTr.appendChild(week1)
			tbodyTopTr.appendChild(week2)
			tbodyTopTr.appendChild(week3)
			tbodyTopTr.appendChild(week4)
			tbodyTopTr.appendChild(week5)
			tbodyTopTr.appendChild(week6)
			tbodyTopTr.appendChild(week0)
			tbody.appendChild(tbodyTopTr)
			
			let days = getcurrentdatedays(year, month-1)
			let firstweek = new Date(year, month-1).getDay()
			let d=0
			let n=0
			for(let r=0;r<6;r++){
				let tbodyTr = document.createElement("tr")
				if(year <= Number(new Date().getFullYear())-100 && month === 1){
					let c=0
					if(r === 0){
						let last = getcurrentdatedays(year, month-2)
						let o = last-firstweek+2
						if(firstweek === 0){
							o = last-5
						}
						for(o;o<=last;o++){
							c++
							let td = document.createElement("td")
							td.innerText = o
							td.style.opacity = 0
							td.setAttribute("class", "last-month")
							tbodyTr.appendChild(td)
						}
					}
					
					for(c;c<7;c++){
						d++
						if(d>days){
							n++
							let td = document.createElement("td")
							td.innerText = n
							let today = new Date()
							if(year === Number(today.getFullYear())+100 && month === 12){
								td.style.opacity = 0
							}else{
								td.setAttribute("class", "next-month")
							}
							tbodyTr.appendChild(td)
							continue
						}
						let td = document.createElement("td")
						td.innerText = d
						let today = new Date()
						if(year === today.getFullYear() && date.getMonth() === today.getMonth() && d === today.getDate()){
							td.setAttribute("class","table-primary")
						}
						tbodyTr.appendChild(td)
						
					}
				}
				else{
					let c=0
					if(r === 0){
						let last = getcurrentdatedays(year, month-2)
						let o = last-firstweek+2
						if(firstweek === 0){
							o = last-5
						}
						for(o;o<=last;o++){
							c++
							let td = document.createElement("td")
							td.innerText = o
							td.setAttribute("class", "last-month")
							tbodyTr.appendChild(td)
						}
					}
					
					for(c;c<7;c++){
						d++
						if(d>days){
							n++
							let td = document.createElement("td")
							td.innerText = n
							let today = new Date()
							if(year === Number(today.getFullYear())+100 && month === 12){
								td.style.opacity = 0
							}else{
								td.setAttribute("class", "next-month")
							}
							tbodyTr.appendChild(td)
							continue
						}
						let td = document.createElement("td")
						td.innerText = d
						let today = new Date()
						if(year === today.getFullYear() && date.getMonth() === today.getMonth() && d === today.getDate()){
							td.setAttribute("class","table-primary")
						}
						tbodyTr.appendChild(td)
						
					}
				}
				tbody.appendChild(tbodyTr)
			}
			
			table.appendChild(thead)
			table.appendChild(tbody)
			table.setAttribute("class","table table-bordered text-center")
			calendar.appendChild(table)
			
			let monthpicker = theadTd
			monthpicker.addEventListener("click", (event)=>{
				let ny = event.target.innerText
				let year = Number(ny.split("年")[0])
				createdatetable(table, year, "date")
			})
			
			let upCalendar = theadUp
			let downCalendar = theadDown
			upCalendar.addEventListener("click", (event)=>{
				let ny = event.target.parentElement.parentElement.firstElementChild.firstElementChild.innerText
				let year = Number(ny.split("年")[0])
				let month = Number(ny.split("年")[1].split("月")[0]) - 1
				let currentyear = Number(new Date().getFullYear())
				if(year > currentyear-100 || (year === currentyear-100 && month > 0)){
					createdatetable(table, new Date(year, month-1), "calendar")
				}
			})
			downCalendar.addEventListener("click", (event)=>{
				let ny = event.target.parentElement.parentElement.firstElementChild.firstElementChild.innerText
				let year = Number(ny.split("年")[0])
				let month = Number(ny.split("年")[1].split("月")[0]) - 1
				let currentyear = Number(new Date().getFullYear())
				if(year < currentyear+100 || (year === currentyear+100 && month < 11)){
					createdatetable(table, new Date(year, month+1), "calendar")
				}
			})
		}
		else if(type === "date"){
			let table = document.createElement("table")
			let thead = document.createElement("thead")
			let tbody = document.createElement("tbody")
			let theadTr = document.createElement("tr")
			let theadTd = document.createElement("td")
			theadTd.setAttribute("colspan","2")
			theadTd.setAttribute("class","text-start")
			let span = document.createElement("span")
			if(!date){
				date = Number(new Date().getFullYear())
			}
			let year = date+"年"
			span.innerText = year
			span.setAttribute("class","y")
			theadTd.appendChild(span)
			let theadUp = document.createElement("td")
			theadUp.innerHTML = "<i class='bi bi-chevron-up'></i>"
			let theadDown = document.createElement("td")
			theadDown.innerHTML = "<i class='bi bi-chevron-down'></i>"
			theadTr.appendChild(theadTd)
			theadTr.appendChild(theadUp)
			theadTr.appendChild(theadDown)
			thead.appendChild(theadTr)
			let m=0
			let n=0
			for(let r=0;r<4;r++){
				let tbodyTr = document.createElement("tr")
				for(let c=0;c<4;c++){
					if(date < Number(new Date().getFullYear())+100){
						if(m > months.length-1){
							let td = document.createElement("td")
							td.innerText = months[n]
							td.setAttribute("class", "next-year")
							tbodyTr.appendChild(td)
							n++
							continue
						}
						let td = document.createElement("td")
						td.innerText = months[m]
						let today = new Date()
						if(date === today.getFullYear() && m === today.getMonth()){
							td.setAttribute("class","table-primary")
						}
						tbodyTr.appendChild(td)
						m++
					}
					else{
						if(n < 4){
							let td = document.createElement("td")
							td.innerText = months[months.length-4+n]
							td.setAttribute("class", "last-year")
							tbodyTr.appendChild(td)
							n++
							continue
						}
						let td = document.createElement("td")
						td.innerText = months[m]
						let today = new Date()
						if(date === today.getFullYear() && m === today.getMonth()){
							td.setAttribute("class","table-primary")
						}
						tbodyTr.appendChild(td)
						m++
					}
				}
				tbody.appendChild(tbodyTr)
			}
			table.appendChild(thead)
			table.appendChild(tbody)
			table.setAttribute("id","calendarTable")
			table.setAttribute("class","table table-bordered text-center align-middle")
			calendar.appendChild(table)
			
			let yearpicker = theadTd
			yearpicker.addEventListener("click",(event)=>{
				let year = Number(event.target.innerText.split("年")[0])
				createdatetable(table, year, "year")
			})
			
			let upCalendar = theadUp
			let downCalendar = theadDown
			upCalendar.addEventListener("click", (event)=>{
				let n = event.target.parentElement.parentElement.firstElementChild.firstElementChild.innerText
				let year = Number(n.split("年")[0])
				let currentyear = Number(new Date().getFullYear())
				if(year > currentyear-100){
					createdatetable(table, year-1, "date")
				}
			})
			downCalendar.addEventListener("click", (event)=>{
				let n = event.target.parentElement.parentElement.firstElementChild.firstElementChild.innerText
				let year = Number(n.split("年")[0])
				let currentyear = Number(new Date().getFullYear())
				if(year < currentyear+100){
					createdatetable(table, year+1, "date")
				}
			})
			tbody.addEventListener("click", (event)=>{
				let year = Number(event.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.innerText.split("年")[0])
				let month = Number(event.target.innerText.split("月")[0])
				if(event.target.className === "next-year"){
					year++
				}
				else if(event.target.className === "last-year"){
					year--
				}
				createdatetable(table, new Date(year, month-1), "calendar")
			})
		}
		else if(type === "year"){
			let table = document.createElement("table")
			let thead = document.createElement("thead")
			let tbody = document.createElement("tbody")
			let theadTr = document.createElement("tr")
			let theadTd = document.createElement("td")
			theadTd.setAttribute("colspan","2")
			theadTd.setAttribute("class","text-start")
			let span = document.createElement("span")
			if(!date){
				date = Number(new Date().getFullYear())
			}
			let curyeararr = []
			let curtenyearsindex = 0
			for(let a=0;a<tenyears.length;a++){
				for(let b=0;b<tenyears[a].length;b++){
					if(date === tenyears[a][b]){
						curyeararr = tenyears[a]
						curtenyearsindex = a
						break
					}
				}
			}
			if(date > Number(new Date().getFullYear())+98 && date <= Number(new Date().getFullYear())+100){
				curyeararr = tenyears[curtenyearsindex-1]
			}
			let year = curyeararr[0]+"~"+curyeararr[curyeararr.length-1]
			span.innerText = year
			span.setAttribute("class","y")
			theadTd.appendChild(span)
			let theadUp = document.createElement("td")
			theadUp.innerHTML = "<i class='bi bi-chevron-up'></i>"
			let theadDown = document.createElement("td")
			theadDown.innerHTML = "<i class='bi bi-chevron-down'></i>"
			theadTr.appendChild(theadTd)
			theadTr.appendChild(theadUp)
			theadTr.appendChild(theadDown)
			thead.appendChild(theadTr)
			
			let y=0
			let i=0
			for(let r=0;r<4;r++){
				let tbodyTr = document.createElement("tr")
				for(let c=0;c<4;c++){
					if(date < Number(new Date().getFullYear())-91){
						if(y>=curyeararr.length){
							let td = document.createElement("td")
							td.innerText = tenyears[curtenyearsindex+1][i]
							td.setAttribute("class","next-year")
							tbodyTr.appendChild(td)
							i++
							continue
						}
						let td = document.createElement("td")
						td.innerText = tenyears[curtenyearsindex][y]
						tbodyTr.appendChild(td)
						y++
					}
					else if(date <= Number(new Date().getFullYear())+88){
						if(r===0 && c<3){
							let td = document.createElement("td")
							if(curtenyearsindex-1 < 0){
								tbodyTr.appendChild(td)
								continue
							}
							td.innerText = tenyears[curtenyearsindex-1][tenyears[curtenyearsindex-1].length-3+c];
							td.setAttribute("class","last-tenyear")
							tbodyTr.appendChild(td)
							continue
						}
						if(y>=curyeararr.length){
							let td = document.createElement("td")
							td.innerText = tenyears[curtenyearsindex+1][c-1];
							td.setAttribute("class","next-tenyear")
							tbodyTr.appendChild(td)
							continue
						}
						let td = document.createElement("td")
						td.innerText = curyeararr[y]
						if(curyeararr[y] === Number(new Date().getFullYear())){
							td.setAttribute("class", "table-primary")
						}
						tbodyTr.appendChild(td)
						y++
					}
					else if(date > Number(new Date().getFullYear())+88 && date <= Number(new Date().getFullYear())+98){
						if(r===0 && c<2){
							let td = document.createElement("td")
							if(curtenyearsindex-1 < 0){
								tbodyTr.appendChild(td)
								continue
							}
							td.innerText = tenyears[curtenyearsindex-1][tenyears[curtenyearsindex-1].length-2+c];
							td.setAttribute("class","last-tenyear")
							tbodyTr.appendChild(td)
							continue
						}
						if(y>=curyeararr.length){
							let td = document.createElement("td")
							if(c < tenyears[curtenyearsindex+1].length){
								td.innerText = tenyears[curtenyearsindex+1][c];
							}else{
								td.style.opacity = 0
							}
							td.setAttribute("class","next-tenyear")
							tbodyTr.appendChild(td)
							continue
						}
						let td = document.createElement("td")
						td.innerText = curyeararr[y]
						tbodyTr.appendChild(td)
						y++
					}
					else if(date > Number(new Date().getFullYear())+98 && date <= Number(new Date().getFullYear())+100){
						if(r===0 && c<2){
							let td = document.createElement("td")
							if(curtenyearsindex-1 < 0){
								tbodyTr.appendChild(td)
								continue
							}
							td.innerText = tenyears[curtenyearsindex-2][tenyears[curtenyearsindex-2].length-2+c];
							td.setAttribute("class","last-tenyear")
							tbodyTr.appendChild(td)
							continue
						}
						if(y>=curyeararr.length){
							let td = document.createElement("td")
							if(c < tenyears[curtenyearsindex].length){
								td.innerText = tenyears[curtenyearsindex][c];
							}else{
								td.style.opacity = 0
							}
							td.setAttribute("class","next-tenyear")
							tbodyTr.appendChild(td)
							continue
						}
						let td = document.createElement("td")
						td.innerText = curyeararr[y]
						tbodyTr.appendChild(td)
						y++
					}
				}
				tbody.appendChild(tbodyTr)
			}
			
			table.appendChild(thead)
			table.appendChild(tbody)
			table.setAttribute("id","calendarTable")
			table.setAttribute("class","table table-bordered text-center align-middle")
			calendar.appendChild(table)
			
			let upCalendar = theadUp
			let downCalendar = theadDown
			upCalendar.addEventListener("click", (event)=>{
				let n = event.target.parentElement.parentElement.firstElementChild.firstElementChild.innerText
				let year = Number(n.split("~")[0])
				let currentyear = Number(new Date().getFullYear())
				if(year > currentyear-90){
					createdatetable(table, year-10, "year")
				}
				else if(year > currentyear-100){
					createdatetable(table, year-9, "year")
				}
			})
			downCalendar.addEventListener("click", (event)=>{
				let n = event.target.parentElement.parentElement.firstElementChild.firstElementChild.innerText
				let year = Number(n.split("~")[0])
				let currentyear = Number(new Date().getFullYear())
				if(year < currentyear+100){
					createdatetable(table, year+10, "year")
				}
			})
			tbody.addEventListener("click", (event)=>{
				if(event.target.innerText){
					createdatetable(table, Number(event.target.innerText), "date")
				}
			})
		}
	}
	createdatetable(null, null, "calendar")
	// createdatetable(2121, "date")
	// createdatetable(1921, "year")
	/*
		日历生成思路：
		1.获取这个月到下个月的天数
		2.获取这个月开始的星期
	*/
}