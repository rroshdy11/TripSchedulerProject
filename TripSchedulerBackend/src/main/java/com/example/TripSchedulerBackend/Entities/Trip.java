package com.example.TripSchedulerBackend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String startTime;

    private String endTime;
    @JsonIgnore
    @Transient
    private LocalDateTime startDateTime;
    @JsonIgnore
    @Transient
    private LocalDateTime endDateTime;
    @ManyToOne
    @JoinColumn(name="fromStation")
    private Station fromStation;
    @ManyToOne
    @JoinColumn(name="toStation")
    private Station toStation;

    public Trip() {
    }

    public Trip(long id, String startTime, String endTime, Station fromStation, Station toStation) {

        this.endTime=endTime;
        this.startTime=startTime;
        this.id = id;
       this.fromStation = fromStation;
       this.toStation = toStation;
    }

    public Trip(String startTime, String endTime, Station fromStation, Station toStation) {

        this.endTime=endTime;
        this.startTime=startTime;
        this.fromStation = fromStation;
        this.toStation = toStation;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getStartTime() {
        return startTime;
    }

    public String getEndTime() {
        return endTime;
    }


    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }



    public Station getFromStation() {
        return fromStation;
    }

    public void setFromStation(Station fromStation) {
        this.fromStation = fromStation;
    }

    public Station getToStation() {
        return toStation;
    }

    public void setToStation(Station toStation) {
        this.toStation = toStation;
    }



    @Override
    public String toString() {
        return "Trip{" +
                "id=" + id +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", fromStation=" + fromStation +
                ", toStation=" + toStation +
                '}';
    }

    public LocalDateTime getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(String startTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(startTime, formatter);
        this.startDateTime = dateTime;
    }

    public void setStartDateTime(LocalDateTime startDateTime) {
        this.startDateTime = startDateTime;
    }

    public LocalDateTime getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(String endTime) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime dateTime = LocalDateTime.parse(endTime, formatter);
        this.endDateTime = dateTime;
    }

}
