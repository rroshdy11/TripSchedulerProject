package com.example.TripSchedulerBackend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
public class Station {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long stationId;
    private String stationName;
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "fromStation",cascade = CascadeType.ALL)
    private List<Trip> fromTrips;
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY,mappedBy = "toStation",cascade = CascadeType.ALL)
    private List<Trip> toTrips;


    public Station() {
    }

    public Station(long stationId, String stationName) {
        this.stationId = stationId;
        this.stationName = stationName;
    }

    public long getStationId() {
        return stationId;
    }

    public void setStationId(long stationId) {
        this.stationId = stationId;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public List<Trip> getFromTrips() {
        return fromTrips;
    }

    public void setFromTrips(List<Trip> fromTrips) {
        this.fromTrips = fromTrips;
    }

    public List<Trip> getToTrips() {
        return toTrips;
    }

    public void setToTrips(List<Trip> toTrips) {
        this.toTrips = toTrips;
    }
}
